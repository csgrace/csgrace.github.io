(() => {
  'use strict';

  const STORAGE_KEY = 'smart-campus:quality-feedback:v1';
  const MAX_RECORDS = 30;
  const originalFetch = window.fetch.bind(window);
  let calendarEvents = [];
  let latestFeedback = [];

  const readFeedback = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  };

  const saveFeedback = (records) => {
    latestFeedback = records.slice(0, MAX_RECORDS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(latestFeedback));
    window.dispatchEvent(new CustomEvent('smart-campus:quality-feedback', {
      detail: latestFeedback,
    }));
  };

  const report = (record) => {
    const fingerprint = `${record.module}:${record.code}:${record.subject || ''}`;
    const records = readFeedback().filter((item) => item.fingerprint !== fingerprint);
    saveFeedback([{ ...record, fingerprint, createdAt: new Date().toISOString() }, ...records]);
  };

  const clearResolved = (module) => {
    const records = readFeedback().filter((item) => item.module !== module);
    saveFeedback(records);
  };

  const toDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const overlaps = (left, right) => {
    const leftStart = toDate(left.scheduled_start);
    const leftEnd = toDate(left.deadline || left.computed_end_time);
    const rightStart = toDate(right.scheduled_start);
    const rightEnd = toDate(right.deadline || right.computed_end_time);
    return leftStart && leftEnd && rightStart && rightEnd && leftStart < rightEnd && rightStart < leftEnd;
  };

  const reviewCalendar = (events) => {
    const issues = [];
    events.forEach((event, index) => {
      const start = toDate(event.scheduled_start);
      const end = toDate(event.deadline || event.computed_end_time);
      if (!start || !end || end <= start) {
        issues.push({
          module: 'calendar',
          code: 'INVALID_TIME_RANGE',
          severity: 'blocking',
          subject: event.title || `事件 ${index + 1}`,
          message: `“${event.title || `事件 ${index + 1}`}”的结束时间必须晚于开始时间。`,
          correction: '请重新安排该事件的起止时间后再保存。',
        });
      }
      events.slice(index + 1).forEach((candidate) => {
        if (overlaps(event, candidate)) {
          issues.push({
            module: 'calendar',
            code: 'TIME_CONFLICT',
            severity: 'blocking',
            subject: [event.title, candidate.title].sort().join('|'),
            message: `“${event.title || '未命名事件'}”与“${candidate.title || '未命名事件'}”存在时间冲突。`,
            correction: '请保留优先级更高的事项，并要求日程助手重新排期。',
          });
        }
      });
    });
    if (issues.length) {
      issues.forEach(report);
    } else {
      clearResolved('calendar');
    }
    return issues;
  };

  const reviewKnowledgeAnswer = (payload) => {
    const lowConfidence = Number(payload.confidence) < 0.55;
    if (payload.answerable === false || payload.needs_clarification || lowConfidence || !payload.citations?.length) {
      report({
        module: 'knowledge',
        code: payload.answerable === false ? 'UNANSWERABLE' : 'INSUFFICIENT_GROUNDING',
        severity: 'review',
        subject: payload.detected_course_scope || 'campus-qa',
        message: '本次问答的可回答性、置信度或引用不足，结果不会被视为可靠结论。',
        correction: '系统将保留问题上下文；请补充限定条件，或要求助手仅基于已引用的校内材料重新回答。',
      });
    } else {
      clearResolved('knowledge');
    }
  };

  const parseUrl = (input) => typeof input === 'string' ? input : input?.url || '';

  window.fetch = async (input, init = {}) => {
    const url = parseUrl(input);
    const method = (init.method || input?.method || 'GET').toUpperCase();

    if (/\/calendar\/events(?:\/|$)/.test(url) && ['POST', 'PUT'].includes(method) && init.body) {
      try {
        const candidate = JSON.parse(init.body);
        const issues = reviewCalendar([...calendarEvents.filter((event) => !/\/events\/[^/]+$/.test(url) || String(event.id) !== url.split('/').pop()), candidate]);
        if (issues.some((issue) => issue.severity === 'blocking')) {
          return new Response(JSON.stringify({
            detail: '质量门禁拦截：检测到日程时间冲突或非法时间范围，请根据反馈校正后再提交。',
            feedback: issues,
          }), { status: 422, headers: { 'Content-Type': 'application/json' } });
        }
      } catch {
        report({
          module: 'calendar',
          code: 'UNREADABLE_EVENT',
          severity: 'review',
          subject: 'event-payload',
          message: '无法解析待保存的日程数据，未将其作为可信规划结果提交。',
          correction: '请检查事件字段后重试。',
        });
      }
    }

    const response = await originalFetch(input, init);
    if (!response.ok) {
      report({
        module: url.includes('course-recommendation') ? 'course-plan' : url.includes('/calendar') ? 'calendar' : 'agent',
        code: 'REQUEST_FAILED',
        severity: 'review',
        subject: `${method} ${url.split('?')[0]}`,
        message: `后处理阶段请求失败（HTTP ${response.status}），不会将本轮结果写入已确认状态。`,
        correction: '保留失败上下文并重试；若持续失败，请降级为人工确认。',
      });
      return response;
    }

    try {
      if (/\/calendar(?:\?|$)/.test(url) && method === 'GET') {
        const payload = await response.clone().json();
        calendarEvents = payload.events || [];
        reviewCalendar(calendarEvents);
      }
      if (/\/qa\/chat\/stream/.test(url)) {
        const reader = response.clone().body?.getReader();
        if (reader) {
          const text = await new Response(new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                controller.enqueue(value);
              }
              controller.close();
            },
          })).text();
          const metadata = text.split('\n').reduce((result, line, index, lines) => {
            if (line.startsWith('event: metadata') && lines[index + 1]?.startsWith('data:')) {
              try { return JSON.parse(lines[index + 1].slice(5).trim()); } catch { return result; }
            }
            return result;
          }, null);
          if (metadata) reviewKnowledgeAnswer(metadata);
        }
      }
    } catch {
      // Quality review is best-effort and must never break the primary workflow.
    }
    return response;
  };

  const requestReplan = () => {
    const issues = readFeedback().filter((item) => item.severity === 'blocking' || item.severity === 'review');
    const prompt = `请根据以下质量审查反馈重新规划，并逐条说明如何消除问题：\n${issues.map((item, index) => `${index + 1}. ${item.message} 建议：${item.correction}`).join('\n')}`;
    const input = [...document.querySelectorAll('textarea')].find((element) => /日程|校园|消息|助手/i.test(element.placeholder || ''));
    if (!input) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
    setter.call(input, prompt);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  };

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]);

  const mountPanel = () => {
    if (document.getElementById('quality-feedback-gate')) return;
    const panel = document.createElement('aside');
    panel.id = 'quality-feedback-gate';
    panel.style.cssText = 'position:fixed;right:18px;bottom:18px;width:min(360px,calc(100vw - 36px));z-index:9999;background:#0f172a;color:#e2e8f0;border:1px solid #334155;border-radius:14px;padding:14px;box-shadow:0 12px 36px rgba(15,23,42,.32);font:12px/1.5 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;';
    const render = () => {
      const records = readFeedback();
      const blocking = records.filter((item) => item.severity === 'blocking').length;
      panel.innerHTML = `<div style="display:flex;justify-content:space-between;gap:12px;align-items:center"><strong>结果质量门禁</strong><span style="color:${blocking ? '#fca5a5' : '#86efac'}">${blocking ? `${blocking} 个待校正问题` : '当前无阻断问题'}</span></div><p style="margin:6px 0;color:#94a3b8">生成 → 规则校验 → 反馈记录 → 校正后再规划；未通过校验的日程不会直接写入。</p><div style="max-height:116px;overflow:auto">${records.slice(0, 3).map((item) => `<div style="border-top:1px solid #334155;padding:6px 0"><b>${escapeHtml(item.module)}</b> · ${escapeHtml(item.message)}</div>`).join('') || '<div style="color:#94a3b8">等待下一次结果审查</div>'}</div><button id="quality-feedback-replan" style="margin-top:10px;border:0;border-radius:8px;padding:7px 10px;background:#10b981;color:white;cursor:pointer">带反馈重新规划</button>`;
      panel.querySelector('#quality-feedback-replan').addEventListener('click', requestReplan);
    };
    window.addEventListener('smart-campus:quality-feedback', render);
    document.body.append(panel);
    render();
  };

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', mountPanel) : mountPanel();
})();
