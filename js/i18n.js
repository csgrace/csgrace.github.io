// ============================================
// Yuqing Wei's Personal Website — i18n Translations
// ============================================

const i18n = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.research": "Research & Work",
    "nav.experience": "Honors & Leadership",
    "nav.contact": "Contact",

    // Index - Hero
    "hero.greeting": "Hi, I'm Yuqing Wei!",
    "hero.subtitle": "Computer Science & Technology Undergraduate @ SUSTech",
    "hero.tagline": "AI · Systems · Research · Building things that matter",

    // Index - Quick Nav
    "quick.about": "About Me",
    "quick.about.desc": "Education, skills & background",
    "quick.research": "Research & Work",
    "quick.research.desc": "Academic research, industry experience & publications",
    "quick.experience": "Honors & Leadership",
    "quick.experience.desc": "Awards, leadership roles & community service",
    "quick.contact": "Contact",
    "quick.contact.desc": "Let's get in touch!",

    // About
    "about.title": "About Me",
    "about.header.desc": "Computer Science & Technology student passionate about AI, systems, and building impactful technology.",
    "about.education": "Education",
    "about.edu.school": "Southern University of Science and Technology (SUSTech)",
    "about.edu.degree": "B.E. in Computer Science and Technology (CSE)",
    "about.edu.date": "Aug. 2023 – Jul. 2027 (Expected)",
    "about.edu.courses": "Core courses",
    "about.edu.courses_list": "Principles of Database Systems, Artificial Intelligence, Natural Language Processing, Algorithm Design and Analysis, Probability and Statistics for Engineering, Software Engineering, etc.",
    "about.skills": "Technical Skills",
    "about.languages": "Languages",
    "about.lang.en": "English — Fluent (IELTS 7.5)",
    "about.lang.en.detail": "Listening 9.0, Reading 8.0, Writing 7.0, Speaking 6.5",
    "about.lang.zh": "Mandarin — Native",
    "about.lang.canto": "Cantonese — Fluent",
    "about.interests": "Research Interests",

    // Research & Work
    "rw.title": "Research & Work",
    "rw.header.desc": "Academic research, industry experience, and publications.",
    "rw.research_title": "Academic Research",
    "rw.work_title": "Work Experience",
    "rw.pub_title": "Publications & Patents",

    "rw.campus.title": "AI Agent Smart Campus Assistant",
    "rw.campus.date": "Mar. 2026 – Jun. 2026",
    "rw.campus.role": "Core Developer",
    "rw.campus.d1": "Developed a LangChain-based RAG assistant that builds a complete data pipeline—ingesting, chunking, embedding, and indexing campus documents, with optimized retrieval and citation-backed LLM generation—to deliver reliable answers from unstructured institutional data.",
    "rw.campus.d2": "Optimized the RAG pipeline through data chunking, contextual enhancement, and retrieval workflow tuning, cutting average response latency to under 3 seconds while improving retrieval accuracy.",
    "rw.campus.d3": "Built a course planning module that ingests curriculum requirements and student credit records to generate personalized semester plans with graduation tracking and credit conflict detection, reducing manual advising effort.",

    "rw.parrotao.title": "ParroTAO Training Analysis Platform",
    "rw.parrotao.date": "Nov. 2025 – Present",
    "rw.parrotao.role": "Project Leader (Provincial Key Undergraduate Innovation Program)",
    "rw.parrotao.d1": "Led project coordination and product iteration for ParroTAO training analysis platform, driving improvement through internal testing, user feedback collection, and feature optimization. The platform has completed internal testing and is preparing for evaluation with university running teams and coaches.",
    "rw.parrotao.d2": "Designed the front-end architecture and developed key modules—team management, training task coordination, interactive visualization dashboards that fuse training logs with physiological data for performance analytics, and AI-assisted analysis interfaces.",
    "rw.parrotao.d3": "Developed and maintained the integrated project website combining the running community and platform information to support product demonstration and user engagement.",

    "rw.nus.title": "NUS School of Computing — AIoT Summer Program",
    "rw.nus.date": "May – Jul. 2025",
    "rw.nus.role": "Front-end Lead",
    "rw.nus.award": "Award: First Prize",
    "rw.nus.d1": "Led front-end development of an intelligent health management system, designing the system architecture and implementing core functional modules including GPS-based exercise tracking with route visualization, hydration logging, dietary data analysis, sedentary reminders, and personalized settings.",
    "rw.nus.d2": "Prioritized user-centric design and interaction experience through iterative usability refinements, ensuring intuitive navigation and accessibility. The system earned First Prize in the program.",

    "rw.nco.title": "General Neural Combinatorial Optimization Model Project",
    "rw.nco.date": "Nov. 2025 – Present",
    "rw.nco.role": "Research Group Member",
    "rw.nco.d1": "Reproduced Transformer-based neural combinatorial optimization models (Pointer Network, Sym-NCO) within EasyCO, converting raw routing data into unified graph-based representations and implementing reinforcement learning training pipelines for benchmark evaluation.",
    "rw.nco.d2": "Evaluated reproduced models on standard benchmark datasets (TSP, CVRP), performing quantitative comparison against reported results to validate implementation correctness, and benchmarked model performance across different problem scales.",

    "rw.cambridge.title": "University of Cambridge, Department of Engineering",
    "rw.cambridge.date": "Jan. – Feb. 2026",
    "rw.cambridge.role": "Group Leader, System Design and Engineering Thinking Winter Course",
    "rw.cambridge.d1": "Analyzed stakeholder needs and interactions among students, educators, and AI learning systems, identifying pain points and deriving functional requirements for the BCI solution.",
    "rw.cambridge.d2": "Visualized system interactions and data/information flows via rich pictures and flowcharts, mapping user-system feedback loops and data exchanges to clarify dependencies and refine the learning solution.",
    "rw.cambridge.d3": "Performed reliability and safety analysis using FMEA and Bowtie, identifying failure modes including signal misinterpretation, usability issues, and data privacy risks, and proposing mitigation strategies.",

    "rw.meituan.title": "Meituan · Leading Tech Retail · Fortune 500",
    "rw.meituan.date": "Jun. 2026 – Sep. 2026",
    "rw.meituan.role": "Agent Training Assistant",
    "rw.meituan.d1": "Optimized AI Agents via prompt engineering, knowledge base design, and skill tuning, using interaction data analysis to evaluate and improve task quality and decision reliability in complex business settings.",
    "rw.meituan.d2": "Developed an Agent evolution dashboard to track iteration effects, conducting performance evaluation and data-driven behavioral analysis to enable overall optimization of agent behaviors.",
    "rw.meituan.d3": "Collaborated with teams to define roles and assign permissions via RBAC, mapping roles to Agent trainers, sub-agent deployers, and end-users to clarify responsibilities and enforce security.",

    "rw.pub1.title": "LLM-Based Invariant Testing for Software Functional Bugs",
    "rw.pub1.venue": "ISSRE Accept",
    "rw.pub1.role": "Co-author",
    "rw.pub1.desc": "Proposed LISA, an LLM-based invariant testing framework that leverages execution trace data (API n-gram feedback) to iteratively generate test oracles (API sequences and invariants), improving functional bug detection beyond fuzzing methods.",
    "rw.pub2.title": "A Training Plan Generation Method, System, Terminal, and Medium Based on LLM Multi-Agent Collaboration",
    "rw.pub2.venue": "Under Review — Patent Application No. 2026104381429",
    "rw.pub2.role": "Co-inventor",
    "rw.pub2.desc": "Proposed a training plan generation method via LLM multi-agent collaboration, covering system architecture, terminal, and storage, which ingests user profile and historical performance data to deliver personalized, science-based training plans aligned with individual goals.",

    // Honors & Leadership
    "hl.title": "Honors & Leadership",
    "hl.header.desc": "Awards, leadership roles, and community engagement.",
    "hl.honors_title": "Honors & Awards",
    "hl.honor1": "Meritorious Winner, Mathematical Contest in Modeling (MCM/ICM)",
    "hl.honor1_date": "May 2026",
    "hl.honor2": "Third Prize (National Level), National English Competition for College Students",
    "hl.honor2_date": "May 2026",
    "hl.honor3": "Outstanding Student, SUSTech",
    "hl.honor3_date": "Dec. 2025",
    "hl.honor4": "Provincial 2nd Prize, National College Mathematical Modeling Competition",
    "hl.honor4_date": "Dec. 2025",
    "hl.honor5": "Third Class of the Merit Student Scholarship (2024–2025), SUSTech",
    "hl.honor5_date": "Nov. 2025",
    "hl.honor6": "Third Prize, Greater Bay Area Robotics Innovation & Entrepreneurship Competition",
    "hl.honor6_date": "Nov. 2025",
    "hl.honor7": "First Prize, AIoT Summer Workshop, National University of Singapore",
    "hl.honor7_date": "Jul. 2025",

    "hl.leadership_title": "Leadership & Activities",
    "hl.rowing.title": "Captain, SUSTech Rowing Team",
    "hl.rowing.date": "Sep. 2025 – Present",
    "hl.rowing.d1": "Coordinated on-water and land training and organized the university-wide Rowing Competition.",
    "hl.rowing.d2": "Guided the team to a third-place finish in the Shenzhen Women's Eight with Coxswain competition and secured a Gold Medal at the Songshan Lake Water Sports Carnival.",

    "hl.tt.title": "Captain, Table Tennis Team, Shuli College",
    "hl.tt.date": "Sep. 2025 – Present",
    "hl.tt.d1": "Organized daily training sessions, planned and hosted the college's Freshman Table Tennis Tournament.",
    "hl.tt.d2": "Led the team to a runner-up finish in the university-level \"Zhumeng Cup\" table tennis team championship.",
    "hl.tt.d3": "Represented the team in a public presentation and won Outstanding Sports Team Scholarship.",

    "hl.volunteer_title": "Community Service & Volunteering",
    "hl.volunteer.date": "2018 – Present",
    "hl.volunteer.d1": "Served as a young guide for visitors at The Shenzhen Museum (2018–2023).",
    "hl.volunteer.d2": "Usher or Greeter at major events: 15th National Games of the People's Republic of China (2025), 5th Cross-Strait Student Baseball League Finals (2024), and GLDC Ballroom Dancing Competition (2024).",

    // Contact
    "contact.title": "Let's Connect!",
    "contact.header.desc": "I'm always open to new opportunities, collaborations, and conversations. Feel free to reach out!",
    "contact.email.uni": "University Email",
    "contact.email.personal": "Personal Email",
    "contact.phone": "Phone",
    "contact.github": "GitHub",
    "contact.location": "Location",
    "contact.location.text": "Shenzhen, China",

    // Footer
    "footer.text": "Made by Yuqing Wei · 2026",

    // Misc
    "menu.label": "Menu",
    "lang.switch": "中文",
  },

  zh: {
    // Nav
    "nav.home": "首页",
    "nav.about": "关于我",
    "nav.research": "研究与工作",
    "nav.experience": "荣誉与领导力",
    "nav.contact": "联系我",

    // Index - Hero
    "hero.greeting": "你好，我是魏宇晴！",
    "hero.subtitle": "南方科技大学 · 计算机科学与技术 · 本科在读",
    "hero.tagline": "人工智能 · 系统工程 · 学术研究 · 创造有价值的东西",

    // Index - Quick Nav
    "quick.about": "关于我",
    "quick.about.desc": "教育背景、技能与个人信息",
    "quick.research": "研究与工作",
    "quick.research.desc": "学术研究、业界实习与发表",
    "quick.experience": "荣誉与领导力",
    "quick.experience.desc": "获奖荣誉、领导角色与志愿服务",
    "quick.contact": "联系我",
    "quick.contact.desc": "欢迎随时联系！",

    // About
    "about.title": "关于我",
    "about.header.desc": "计算机科学与技术专业学生，热爱人工智能与系统工程，致力于创造有影响力的技术。",
    "about.education": "教育背景",
    "about.edu.school": "南方科技大学 (SUSTech)",
    "about.edu.degree": "计算机科学与技术 本科 (CSE)",
    "about.edu.date": "2023 年 8 月 – 2027 年 7 月（预计）",
    "about.edu.courses": "核心课程",
    "about.edu.courses_list": "数据库系统原理、人工智能、自然语言处理、算法设计与分析、工程概率与统计、软件工程等",
    "about.skills": "技术技能",
    "about.languages": "语言能力",
    "about.lang.en": "英语 — 流利 (IELTS 7.5)",
    "about.lang.en.detail": "听力 9.0, 阅读 8.0, 写作 7.0, 口语 6.5",
    "about.lang.zh": "普通话 — 母语",
    "about.lang.canto": "粤语 — 流利",
    "about.interests": "研究兴趣",

    // Research & Work
    "rw.title": "研究与工作",
    "rw.header.desc": "学术研究、业界实习经历与发表。",
    "rw.research_title": "学术研究",
    "rw.work_title": "工作经历",
    "rw.pub_title": "发表与专利",

    "rw.campus.title": "AI Agent 智慧校园助手",
    "rw.campus.date": "2026 年 3 月 – 6 月",
    "rw.campus.role": "核心开发者",
    "rw.campus.d1": "开发了一个基于 LangChain 的 RAG 助手，构建了完整的数据管道——接入、分块、嵌入和索引校园文档，配合优化检索与带引用的 LLM 生成——从非结构化机构数据中提供可靠答案。",
    "rw.campus.d2": "通过数据分块、上下文增强与检索工作流调优，优化了 RAG 流水线，将平均响应延迟降至 3 秒以内，同时提升了检索准确率。",
    "rw.campus.d3": "构建了一个课程规划模块，通过接入培养方案要求与学生已修学分记录，生成包含毕业追踪与学分冲突检测的个性化学期计划，减少了人工咨询工作量。",

    "rw.parrotao.title": "ParroTAO 训练分析平台",
    "rw.parrotao.date": "2025 年 11 月 – 至今",
    "rw.parrotao.role": "项目负责人（省级重点大学生创新创业项目）",
    "rw.parrotao.d1": "主导了 ParroTAO 训练分析平台的项目协调与产品迭代，通过内部测试、用户反馈收集和功能优化推动改进。平台已完成内部测试，正筹备在校级跑团与教练中开展评估。",
    "rw.parrotao.d2": "负责前端架构设计，开发了运动队管理、训练任务协调、将训练日志与生理数据融合以进行绩效分析的可视化面板，以及 AI 辅助分析界面等核心模块。",
    "rw.parrotao.d3": "开发并维护了整合跑团社区与平台信息的项目网站，以支持产品演示与用户互动。",

    "rw.nus.title": "新加坡国立大学 (NUS) 计算机学院 — AIoT 暑期项目",
    "rw.nus.date": "2025 年 5 月 – 7 月",
    "rw.nus.role": "前端负责人",
    "rw.nus.award": "奖项：第一名",
    "rw.nus.d1": "主导了智能健康管理系统的前端开发，设计系统架构并实现了基于 GPS 的运动追踪与路线可视化、饮水记录、饮食数据分析、久坐提醒及个性化设置等核心功能模块。",
    "rw.nus.d2": "贯穿始终地优先考虑了以用户为中心的设计与交互体验，通过迭代式易用性优化确保直观导航与可访问性。该系统最终在课程中荣获第一名。",

    "rw.nco.title": "通用神经组合优化模型项目",
    "rw.nco.date": "2025 年 11 月 – 至今",
    "rw.nco.role": "研究组成员",
    "rw.nco.d1": "在 EasyCO 框架内复现了基于 Transformer 的神经组合优化模型（Pointer Network、Sym-NCO），将原始路径数据转换为统一的图表示，并实现了强化学习训练流水线以进行基准评估。",
    "rw.nco.d2": "在标准基准数据集（TSP、CVRP）上评估了复现的模型，通过定量对比验证了实现正确性，并评测了模型在不同问题规模下的性能表现。",

    "rw.cambridge.title": "英国剑桥大学工程系",
    "rw.cambridge.date": "2026 年 1 月 – 2 月",
    "rw.cambridge.role": "系统设计与工程思维冬季课程 组长",
    "rw.cambridge.d1": "分析学生、教育者和 AI 学习系统之间的利益相关者需求与交互，识别痛点，为 BCI 方案提炼功能需求。",
    "rw.cambridge.d2": "通过丰富图和流程图可视化系统交互与数据/信息流，梳理用户-系统反馈回路与数据交换，理顺系统模块间的逻辑关系，优化设计方案。",
    "rw.cambridge.d3": "运用 FMEA 和 Bowtie 进行可靠性与安全性分析，识别信号误读、可用性问题及数据隐私风险，并提出缓解策略。",

    "rw.meituan.title": "美团 · 领先科技零售 · 世界 500 强",
    "rw.meituan.date": "2026 年 6 月 – 9 月",
    "rw.meituan.role": "智能体训练助理",
    "rw.meituan.d1": "通过提示工程、知识库设计与技能调优优化 AI 数字员工，利用交互数据分析评估并提升复杂场景下的任务质量与决策可靠性。",
    "rw.meituan.d2": "开发智能体演化看板，追踪迭代影响，进行性能评估与数据驱动的行为分析，支持智能体行为的整体优化。",
    "rw.meituan.d3": "与团队协作，通过基于角色的访问控制 (RBAC) 定义角色并分配权限，将角色映射至智能体训练师、子智能体部署人员和终端用户，以明确职责并强化安全性。",

    "rw.pub1.title": "基于大语言模型的不变式测试用于软件功能缺陷检测",
    "rw.pub1.venue": "ISSRE 接收",
    "rw.pub1.role": "共同作者",
    "rw.pub1.desc": "提出了 LISA，一个基于大语言模型的不变式测试框架，利用执行轨迹数据（API n-gram 反馈）迭代生成测试预言（API 序列与不变量），在功能缺陷检测方面超越了模糊测试方法。",
    "rw.pub2.title": "基于大语言模型多智能体协作的训练计划生成方法、系统、终端及介质",
    "rw.pub2.venue": "审查中 — 专利申请号 2026104381429",
    "rw.pub2.role": "共同发明人",
    "rw.pub2.desc": "提出了一种基于大语言模型多智能体协作的训练计划生成方法，涵盖系统架构、终端及存储介质，通过接入用户画像与历史表现数据，提供与个人目标相匹配的个性化、科学化训练方案。",

    // Honors & Leadership
    "hl.title": "荣誉与领导力",
    "hl.header.desc": "获奖荣誉、领导角色与社区服务。",
    "hl.honors_title": "获奖与荣誉",
    "hl.honor1": "美国大学生数学建模竞赛 (MCM/ICM) 一等奖 (Meritorious Winner)",
    "hl.honor1_date": "2026 年 5 月",
    "hl.honor2": "全国大学生英语竞赛 全国三等奖",
    "hl.honor2_date": "2026 年 5 月",
    "hl.honor3": "优秀学生，南方科技大学",
    "hl.honor3_date": "2025 年 12 月",
    "hl.honor4": "全国大学生数学建模竞赛 省级二等奖",
    "hl.honor4_date": "2025 年 12 月",
    "hl.honor5": "优秀学生奖学金三等奖（2024–2025 学年），南方科技大学",
    "hl.honor5_date": "2025 年 11 月",
    "hl.honor6": "大湾区青年创新创业大赛（机器人专项赛）三等奖",
    "hl.honor6_date": "2025 年 11 月",
    "hl.honor7": "新加坡国立大学 AIoT 暑期工作坊 一等奖",
    "hl.honor7_date": "2025 年 7 月",

    "hl.leadership_title": "领导力与活动",
    "hl.rowing.title": "南方科技大学赛艇队 队长",
    "hl.rowing.date": "2025 年 9 月 – 至今",
    "hl.rowing.d1": "协调水上与陆上训练，组织校级赛艇比赛。",
    "hl.rowing.d2": "带领团队获得深圳市女子八人单桨有舵手比赛第三名，并在松山湖水上运动嘉年华中夺得金牌。",

    "hl.tt.title": "树礼书院乒乓球队 队长",
    "hl.tt.date": "2025 年 9 月 – 至今",
    "hl.tt.d1": "组织球队日常训练，统筹策划并举办了书院乒乓球新生赛。",
    "hl.tt.d2": "带领球队在校级“筑梦杯”乒乓球团体赛中斩获亚军。",
    "hl.tt.d3": "代表球队通过公开答辩，成功为团队赢得树礼书院“优秀运动团体”奖学金。",

    "hl.volunteer_title": "社区服务与志愿活动",
    "hl.volunteer.date": "2018 年 – 至今",
    "hl.volunteer.d1": "在深圳博物馆担任小小讲解员（2018–2023 年）。",
    "hl.volunteer.d2": "在多项大型活动中担任接待或引导志愿者：第十五届全国运动会（2025 年）、第五届海峡两岸学生棒球联赛总决赛（2024 年）、GLDC 国际标准舞锦标赛（2024 年）。",

    // Contact
    "contact.title": "联系我！",
    "contact.header.desc": "我始终欢迎新的机会、合作与交流。随时联系我！",
    "contact.email.uni": "学校邮箱",
    "contact.email.personal": "个人邮箱",
    "contact.phone": "电话",
    "contact.github": "GitHub",
    "contact.location": "所在地",
    "contact.location.text": "中国 · 深圳",

    // Footer
    "footer.text": "Made by 魏宇晴 · 2026",

    // Misc
    "menu.label": "菜单",
    "lang.switch": "English",
  }
};

// ============================================
// i18n Engine
// ============================================

const I18N_KEY = 'grace-site-lang';

function getLang() {
  const saved = localStorage.getItem(I18N_KEY);
  if (saved === 'en' || saved === 'zh') return saved;
  const browserLang = navigator.language || '';
  return browserLang.startsWith('zh') ? 'zh' : 'en';
}

function setLang(lang) {
  localStorage.setItem(I18N_KEY, lang);
}

function applyI18n() {
  const lang = getLang();
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n[lang]?.[key] ?? i18n.en[key] ?? key;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = i18n[lang]?.[key] ?? i18n.en[key] ?? key;
  });

  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.textContent = lang === 'zh' ? i18n.zh['lang.switch'] : i18n.en['lang.switch'];
  }

  const titleEl = document.querySelector('title');
  if (titleEl && titleEl.hasAttribute('data-i18n-title')) {
    const key = titleEl.getAttribute('data-i18n-title');
    document.title = (i18n[lang]?.[key] ?? i18n.en[key]) || document.title;
  }
}

function toggleLang() {
  const current = getLang();
  setLang(current === 'zh' ? 'en' : 'zh');
  applyI18n();
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  const langBtn = document.getElementById('lang-switch');
  if (langBtn) langBtn.addEventListener('click', toggleLang);
});
