(() => {
  const trendData = { questions: [62, 78, 101, 126, 110, 138], answers: [31, 38, 49, 54, 47, 60] };
  const chart = document.querySelector('#trend-chart');
  const trendSelect = document.querySelector('#trend-select');
  const trendNote = document.querySelector('#trend-note');
  function renderChart() {
    const values = trendData[trendSelect.value]; const maximum = Math.max(...values);
    chart.innerHTML = values.map(value => `<div class="bar" data-value="${value}" style="height:${Math.round(value / maximum * 100)}%"></div>`).join('');
    trendNote.textContent = trendSelect.value === 'questions' ? '以提问量展示 Java 主题的年度活跃度。' : '以每题平均回答数量展示社区响应度。';
  }
  trendSelect.addEventListener('change', renderChart); renderChart();
})();
