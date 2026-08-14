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
    "hero.greeting": "Turning real-world problems into AI systems that actually work",
    "hero.eyebrow": "Agent Engineering · Data-Driven AI · Knowledge Systems",
    "hero.subtitle": "Computer Science & Technology Undergraduate @ SUSTech",
    "hero.desc": "I'm Yuqing Wei — I bridge the gap between AI capability and real-world reliability. My work spans agent skill optimization, knowledge base engineering, and evaluation frameworks, ensuring the systems I build are not just smart, but trustworthy, measurable, and genuinely useful to the people who depend on them.",

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
    "interest.agentic_rag": "Agentic RAG",
    "interest.aiot": "AIoT",
    "interest.neural_co": "Neural Combinatorial Optimization",
    "interest.bci": "Brain-Computer Interface",
    "interest.sports": "Sports Health",

    // Research & Work
    "rw.title": "Research & Work",
    "rw.header.desc": "Academic research, industry experience, and publications.",
    "rw.research_title": "Research Projects",
    "rw.work_title": "Internship Experience",
    "rw.pub_title": "Papers & Patents",

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

    "rw.meituan.title": "Meituan",
    "rw.meituan.date": "Jun. 2026 – Sep. 2026",
    "rw.meituan.role": "Agent Training Assistant",
    "rw.meituan.d1": "Optimized AI Agents via <strong>prompt engineering</strong>, <strong>knowledge base design</strong>, and <strong>skill tuning</strong>, using interaction data analysis to evaluate and improve task quality and decision reliability in complex business settings.",
    "rw.meituan.d2": "Developed an <strong>Agent evolution dashboard</strong> to track iteration effects, conducting performance evaluation and data-driven behavioral analysis to enable overall optimization of agent behaviors.",
    "rw.meituan.d3": "Collaborated with teams to design a <strong>four-role RBAC model</strong> — <strong>Owner</strong>, <strong>Trainer</strong>, <strong>Permission Admin</strong>, and <strong>User</strong> — clarifying operational boundaries and enforcing security across the agent platform.",

    "rw.pub1.title": "LLM-Based Invariant Testing for Software Functional Bugs",
    "rw.pub1.venue": "ISSRE Accept",
    "rw.pub1.role": "Co-author",
    "rw.pub1.desc": "Proposed LISA, an LLM-based invariant testing framework that leverages execution trace data (API n-gram feedback) to iteratively generate test oracles (API sequences and invariants), improving functional bug detection beyond fuzzing methods.",
    "rw.pub2.title": "A Training Plan Generation Method, System, Terminal, and Medium Based on LLM Multi-Agent Collaboration",
    "rw.pub2.venue": "Under Review — Patent Application No. 2026104381429",
    "rw.pub2.role": "Co-inventor",
    "rw.pub2.desc": "Proposed a training plan generation method via LLM multi-agent collaboration, covering system architecture, terminal, and storage, which ingests user profile and historical performance data to deliver personalized, science-based training plans aligned with individual goals.",

    // Tabs
    "tab.research": "Research Projects",
    "tab.work": "Internship Experience",
    "tab.pub": "Papers & Patents",
    "tab.github": "GitHub Projects",

    // GitHub Projects
    "gh.title": "GitHub Projects",
    "gh.nusaiot": "Smart Health System — NUS AIOT",
    "gh.nusaiot.desc": "Full-stack intelligent health management system. First Prize at NUS AIoT Summer Workshop.",
    "gh.ai": "CS303 — Artificial Intelligence",
    "gh.ai.desc": "Reversi AI agent, income prediction pipeline, full lecture & lab archive.",
    "gh.db": "CS307 — Database Principles",
    "gh.db.desc": "Full-stack Java + Vue project for database course.",
    "gh.network": "CS305 — Computer Networks",
    "gh.network.desc": "P2P file transfer with reliable data transport + course materials.",
    "gh.cpu": "CS202 — CPU Design",
    "gh.cpu.desc": "5-stage pipelined RISC processor with hazard detection, data forwarding, and memory-mapped I/O — from ISA to FPGA.",
    "gh.cs209a": "CS209A — Computer System Design & Applications A",
    "gh.cs209a.desc": "Try the QQ Farm web demo and explore the Stack Overflow data collection & analysis dashboard.",
    "gh.cs209a.farm": "QQ Farm",
    "gh.cs209a.data": "Java Data Lab",
    "gh.digital": "CS207 — Digital Logic",
    "gh.digital.desc": "FPGA range hood controller: FSM-driven, 10+ sub-modules, cross-clock-domain, multi-device I/O on EGO1 board.",
    "gh.game2048": "CS109 — 2048 Game",
    "gh.game2048.desc": "Java implementation of the classic 2048 game.",
    "gh.motion": "EE205 — Motion Detection via Communication Signals",
    "gh.motion.desc": "Signal processing project for electrical engineering course.",
    "gh.ncatbot": "NcatBot — QQ Bot SDK",
    "gh.ncatbot.desc": "Fork: NapCat Python SDK for QQ bot development.",
    "gh.cs340": "CS340 — Computational Ethics",
    "gh.cs340.desc": "Computational Ethics course project.",
    "repo.view": "View Repository",
    "rw.detail_link": "View Details →",

    // Honors & Leadership
    "hl.title": "Honors & Leadership",
    "hl.header.desc": "Awards, leadership roles, and community engagement.",
    "hl.honors_title": "Honors & Awards",
    "hl.tab_awards": "Honors",
    "hl.tab_leadership": "Leadership",
    "hl.tab_volunteer": "Volunteer",
    "hl.cat_moral": "Moral Education",
    "hl.cat_academic": "Academic",
    "hl.cat_innovation": "Innovation & Entrepreneurship",
    "hl.cat_scholarship": "Scholarship",
    "hl.cat_sports": "Sports",
    "hl.cat_team": "Team",
    "hl.cat_individual": "Individual",
    "hl.sport1": "Third Place, Shenzhen Women's Eight with Coxswain Competition",
    "hl.sport1_date": "2025",
    "hl.sport2": "Gold Medal, Songshan Lake Water Sports Carnival",
    "hl.sport2_date": "2025",
    "hl.sport3": "Runner-up, University-Level \"Zhumeng Cup\" Table Tennis Team Championship",
    "hl.sport3_date": "2025",
    "hl.sport_empty": "No individual awards yet",
    "hl.volunteer_events_title": "Major Event Volunteering",
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
    "hl.rowing.d1": "Coordinated twice-weekly land training sessions and weekend on-water training, managed team recruitment and attendance.",
    "hl.rowing.d2": "Organized the semesterly indoor rowing qualifying meet and oversaw new member tryouts and daily attendance tracking.",
    "hl.rowing.d3": "Guided the team to a third-place finish in the Shenzhen X9 Rowing League Women's Eight with Coxswain competition and secured a Gold Medal at the Songshan Lake Water Sports Carnival.",

    "hl.tt.title": "Captain, Table Tennis Team, Shuli College",
    "hl.tt.date": "Sep. 2025 – Present",
    "hl.tt.d1": "Organized weekly team training sessions and held internal round-robin matches before competitions for preparation.",
    "hl.tt.d2": "Planned and hosted the 2025 Shuli College Freshman Table Tennis Tournament.",
    "hl.tt.d3": "Led the team to a runner-up finish in the university-level \"Zhumeng Cup\" table tennis team championship and champion in the undergraduate division.",
    "hl.tt.d4": "Represented the team in a public presentation and successfully won the 2025 Shuli College \"Outstanding Sports Team\" Scholarship.",

    "hl.volunteer_title": "Community Service & Volunteering",
    "hl.volunteer.date": "2018 – Present",
    "hl.volunteer.d1": "Served as a young guide for visitors at The Shenzhen Museum (2018–2023).",
    "hl.volunteer.d2": "Usher or Greeter at major events: 15th National Games of the People's Republic of China (2025), 5th Cross-Strait Student Baseball League Finals (2024), and GLDC Ballroom Dancing Competition (2024).",

    // Contact
    "contact.title": "Let's Connect!",
    "contact.home_title": "Get in Touch",
    "contact.email.label": "Email",
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
    "presentation.banner": "📽️ View my Interview Presentation →",
    "presentation.download": "Download PPTX",
    "ppt.pw.title": "Password Required",
    "ppt.pw.sub": "Please enter the password to view the presentation",
    "ppt.pw.btn": "Confirm",
    "ppt.pw.err": "Incorrect password, please try again",
    "ppt.pw.cancel": "Cancel",

    // Meituan Detail
    "meituan.page.title": "Meituan Internship — Yuqing Wei",
    "meituan.detail.sub": "Agent Training Assistant · 2026.06 – 2026.09 · Beijing",
    "meituan.hero.title": "Meituan",
    "meituan.detail.company": "About Meituan",
    "meituan.detail.company.desc": "Meituan (美团) is China's leading e-commerce platform for services, founded in 2010 and listed on the Hong Kong Stock Exchange (3690.HK). With over 700 million annual transacting users, Meituan connects consumers with local businesses across food delivery, in-store dining, hotel & travel booking, and retail. As a Fortune 500 company, Meituan is also a major force in AI and autonomous delivery—operating one of the world's largest real-time dispatch systems and investing heavily in LLM-powered agent technologies to transform service industry operations.",
    "meituan.detail.overview": "My Internship",
    "meituan.detail.overview.desc": "During my internship at Meituan, I worked on optimizing AI Agents deployed in production business workflows—including order processing, customer communication, and internal operations. I focused on three core technical challenges: Skill execution reliability, knowledge base quality, and long-term memory management. Each required diving deep into agent internals, designing evaluation frameworks, and shipping measurable improvements.",
    "meituan.detail.stat1.num": "4",
    "meituan.detail.stat1.label": "Technical Pillars",
    "meituan.detail.stat2.num": "4",
    "meituan.detail.stat2.label": "Evaluation Dimensions",
    "meituan.detail.stat3.num": "6",
    "meituan.detail.stat3.label": "KB Quality Metrics",
    "meituan.problem": "Problem",
    "meituan.solution": "Solution",
    "meituan.skill.title": "Skill Execution Optimization",
    "meituan.skill.problem": "Unstable skill execution with inconsistent success rates across different use cases and trigger patterns.",
    "meituan.skill.s1": "Tested each Skill with trigger-based prompts covering typical use cases and edge cases",
    "meituan.skill.s2": "Evaluated across 4 dimensions: tool invocation, intent recognition, response fluency, output quality",
    "meituan.skill.s3": "Merged / split overlapping Skills to reduce conflicts and false triggers",
    "meituan.skill.s4": "Categorized errors (SSO / CIBA / whitelist) and reported structured feedback to the dev team",
    "meituan.kb.title": "Knowledge Base Quality Engineering",
    "meituan.kb.problem": "When answering internal policy questions, the agent relied on model memory instead of retrieval, leading to outdated or hallucinated responses.",
    "meituan.kb.s1": "Decision Correction Skill: A meta-skill that detects retrieval-vs-memory conflicts and forces KB lookup when a policy question is detected",
    "meituan.kb.s2": "Ontology-Driven Knowledge Organization: An Entity–Relation–Action framework for structuring enterprise knowledge, ensuring consistent retrieval across semantically similar queries",
    "meituan.kb.s3": "Knowledge-Base Evaluation Suite — dual-benchmark architecture:",
    "meituan.kb.fixed_label": "Fixed Baseline Set",
    "meituan.kb.fixed_desc": "Lock core scenarios, ensure longitudinal comparability. High-frequency queries + document back-derivation + manually designed boundary cases.",
    "meituan.kb.dynamic_label": "Dynamic Live Set",
    "meituan.kb.dynamic_desc": "Cover emerging issues, ensure horizontal sensitivity. Online Bad/Good Cases + user query sampling + KB update back-derivation.",
    "meituan.kb.m1": "Response grounded in source",
    "meituan.kb.m2": "Matches query intent",
    "meituan.kb.m3": "No irrelevant chunks",
    "meituan.kb.m4": "All relevant chunks retrieved",
    "meituan.kb.m5": "Up-to-date information",
    "meituan.kb.m6": "Accuracy · compliance · adoption",
    "meituan.kb.m1_name": "Faithfulness",
    "meituan.kb.m2_name": "Relevance",
    "meituan.kb.m3_name": "Precision",
    "meituan.kb.m4_name": "Recall",
    "meituan.kb.m5_name": "Freshness",
    "meituan.kb.m6_name": "Business Impact",
    "meituan.memory.title": "Long-Term Memory Architecture",
    "meituan.memory.problem": "Long-term memory grows too large for the context window, causing overflow, latency spikes, and diluted focus on the current task.",
    "meituan.memory.tree_title": "📂 Directory Tree",
    "meituan.memory.tree_desc": "Layered Storage. A master index resides in context, recording which category maps to which partition. User preferences and historical decisions are split into separate sub-files by category. Context loads only the index, not the full memory volume.",
    "meituan.memory.load_title": "🔄 Progressive Loading",
    "meituan.memory.load_desc": "On-Demand Retrieval. Read the index to locate the target partition, then fetch only what's needed. Release immediately after use — no long-term context occupation. Full memory remains addressable, while the context window stays consistently lightweight.",
    "meituan.rbac.title": "RBAC Permission Architecture",
    "meituan.rbac.problem": "Without proper access control, unauthorized configuration changes to agent prompts, skills, and deployments could disrupt production workflows and introduce security risks.",
    "meituan.rbac.solution": "Collaborated across teams to define a four-role access control model for the agent platform. Each role maps to specific permissions, creating clear operational boundaries and a security baseline for the multi-tenant agent ecosystem:",
    "meituan.rbac.r1_name": "Owner",
    "meituan.rbac.r1_desc": "Full platform control, system configuration, audit access",
    "meituan.rbac.r2_name": "Trainer",
    "meituan.rbac.r2_desc": "Prompt & skill management, knowledge base editing, agent tuning",
    "meituan.rbac.r3_name": "Permission Admin",
    "meituan.rbac.r3_desc": "Role assignment, access policy configuration, security audit",
    "meituan.rbac.r4_name": "User",
    "meituan.rbac.r4_desc": "Agent interaction only, no configuration access",
    "meituan.detail.takeaway": "Key Takeaways",
    "meituan.detail.takeaway.desc": "1. AI Agents in production ≠ demos. Real-world deployment requires robust evaluation, monitoring, and iteration loops. A single prompt template isn't enough—you need a system. 2. Data closes the loop. The evolution dashboard and KB evaluation suite turned agent optimization from \"gut feeling\" into a measurable, repeatable process. Every change was tracked and validated. 3. Memory is architecture, not storage. The Directory Tree + Progressive Loading pattern solved context overflow without losing information fidelity. Full memory addressable, context window lightweight. 4. Security scales with roles. The four-role RBAC model created clear boundaries: Owner, Trainer, Permission Admin, and User—ensuring that every action on the platform is authorized and auditable.",
  },

  zh: {
    // Nav
    "nav.home": "首页",
    "nav.about": "关于我",
    "nav.research": "研究与工作",
    "nav.experience": "荣誉与领导力",
    "nav.contact": "联系我",

    // Index - Hero
    "hero.greeting": "把现实世界的问题变成真正可靠的 AI 系统",
    "hero.eyebrow": "Agent 工程 · 数据驱动 AI · 知识系统",
    "hero.subtitle": "南方科技大学 · 计算机科学与技术 · 本科在读",
    "hero.desc": "我是魏宇晴——我致力于在 AI 能力与真实世界可靠性之间架起桥梁。我的工作涵盖 Agent 技能优化、知识库工程和评估框架，确保构建的系统不仅智能，而且值得信赖、可度量，并真正帮助到依赖它们的人。",

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
    "interest.agentic_rag": "Agentic RAG",
    "interest.aiot": "AIoT",
    "interest.neural_co": "神经组合优化算法",
    "interest.bci": "脑机接口",
    "interest.sports": "运动健康",

    // Research & Work
    "rw.title": "研究与工作",
    "rw.header.desc": "学术研究、业界实习经历与发表。",
    "rw.research_title": "研究项目",
    "rw.work_title": "实习经历",
    "rw.pub_title": "论文与专利",

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

    "rw.meituan.title": "美团",
    "rw.meituan.date": "2026 年 6 月 – 9 月",
    "rw.meituan.role": "智能体训练助理",
    "rw.meituan.d1": "通过<strong>提示词工程</strong>、<strong>知识库设计</strong>与<strong>Skill 调优</strong>优化 AI 智能体，利用交互数据分析评估并提升复杂场景下的任务质量与决策可靠性。",
    "rw.meituan.d2": "开发<strong>智能体演化看板</strong>，追踪迭代效果，进行性能评估与数据驱动的行为分析，支持智能体行为的整体优化。",
    "rw.meituan.d3": "与团队协作，设计<strong>四角色 RBAC 模型</strong>——<strong>Owner</strong>、<strong>训练师</strong>、<strong>权限管理员</strong>和<strong>用户</strong>——明确操作边界，保障 Agent 平台安全。",

    "rw.pub1.title": "基于大语言模型的不变式测试用于软件功能缺陷检测",
    "rw.pub1.venue": "ISSRE 接收",
    "rw.pub1.role": "共同作者",
    "rw.pub1.desc": "提出了 LISA，一个基于大语言模型的不变式测试框架，利用执行轨迹数据（API n-gram 反馈）迭代生成测试预言（API 序列与不变量），在功能缺陷检测方面超越了模糊测试方法。",
    "rw.pub2.title": "基于大语言模型多智能体协作的训练计划生成方法、系统、终端及介质",
    "rw.pub2.venue": "审查中 — 专利申请号 2026104381429",
    "rw.pub2.role": "共同发明人",
    "rw.pub2.desc": "提出了一种基于大语言模型多智能体协作的训练计划生成方法，涵盖系统架构、终端及存储介质，通过接入用户画像与历史表现数据，提供与个人目标相匹配的个性化、科学化训练方案。",

    // Tabs
    "tab.research": "研究项目",
    "tab.work": "实习经历",
    "tab.pub": "论文与专利",
    "tab.github": "GitHub 项目",

    // GitHub Projects
    "gh.title": "GitHub 项目",
    "gh.nusaiot": "智能健康系统 — NUS AIOT",
    "gh.nusaiot.desc": "全栈智能健康管理系统，荣获 NUS AIoT 暑期工作坊一等奖。",
    "gh.ai": "CS303 — 人工智能",
    "gh.ai.desc": "黑白棋 AI 代理、收入预测管道、完整讲义与实验存档。",
    "gh.db": "CS307 — 数据库原理",
    "gh.db.desc": "数据库课程的全栈 Java + Vue 项目。",
    "gh.network": "CS305 — 计算机网络",
    "gh.network.desc": "P2P 文件传输（可靠数据传输）+ 课程资料。",
    "gh.cpu": "CS202 — CPU 设计",
    "gh.cpu.desc": "五级流水线 RISC 处理器：冒险检测与转发、哈佛结构、内存映射 I/O，从 ISA 设计到 FPGA 上板验证。",
    "gh.cs209a": "CS209A — 计算机系统设计与应用 A",
    "gh.cs209a.desc": "体验 QQ 农场网页试玩版，并查看 Stack Overflow 数据采集与分析仪表盘。",
    "gh.cs209a.farm": "QQ 农场",
    "gh.cs209a.data": "Java 数据实验室",
    "gh.digital": "CS207 — 数字逻辑",
    "gh.digital.desc": "FPGA 抽油烟机控制器：FSM 状态机调度、10+ 子模块、跨时钟域设计、多设备 I/O。",
    "gh.game2048": "CS109 — 2048 游戏",
    "gh.game2048.desc": "经典 2048 游戏的 Java 实现。",
    "gh.motion": "EE205 — 基于通信信号的运动检测",
    "gh.motion.desc": "电子工程课程信号处理项目。",
    "gh.ncatbot": "NcatBot — QQ 机器人 SDK",
    "gh.ncatbot.desc": "Fork: NapCat Python SDK，用于 QQ 机器人开发。",
    "gh.cs340": "CS340 — 计算机伦理学",
    "gh.cs340.desc": "计算机伦理学课程项目。",
    "repo.view": "查看仓库",
    "rw.detail_link": "查看详情 →",

    // Honors & Leadership
    "hl.title": "荣誉与领导力",
    "hl.header.desc": "获奖荣誉、领导角色与社区服务。",
    "hl.honors_title": "获奖与荣誉",
    "hl.tab_awards": "奖项",
    "hl.tab_leadership": "领导力",
    "hl.tab_volunteer": "志愿者",
    "hl.cat_moral": "德育荣誉",
    "hl.cat_academic": "学业荣誉",
    "hl.cat_innovation": "创新创业荣誉",
    "hl.cat_scholarship": "奖学金",
    "hl.cat_sports": "体育奖项",
    "hl.cat_team": "团体",
    "hl.cat_individual": "个人",
    "hl.sport1": "深圳市女子八人单桨有舵手比赛 第三名",
    "hl.sport1_date": "2025",
    "hl.sport2": "松山湖水上运动嘉年华 金牌",
    "hl.sport2_date": "2025",
    "hl.sport3": "校级「筑梦杯」乒乓球团体赛 亚军",
    "hl.sport3_date": "2025",
    "hl.sport_empty": "暂无个人奖项记录",
    "hl.volunteer_events_title": "大型活动志愿者",
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
    "hl.rowing.d1": "协调一周两次的陆上训练以及每周末的水上训练，负责赛艇队招新和考勤。",
    "hl.rowing.d2": "组织每学期的陆上赛艇通级达标赛，负责赛艇队招新及日常考勤管理。",
    "hl.rowing.d3": "带领团队获得深圳市 X9 赛艇联赛女子八人单桨有舵手比赛第三名，并在松山湖水上运动嘉年华中夺得金牌。",

    "hl.tt.title": "树礼书院乒乓球队 队长",
    "hl.tt.date": "2025 年 9 月 – 至今",
    "hl.tt.d1": "组织球队每周日常训练，赛前举行队内循环赛备赛。",
    "hl.tt.d2": "统筹策划并举办了 2025 年树礼书院乒乓球新生赛。",
    "hl.tt.d3": "带领球队在校级「筑梦杯」乒乓球团体赛中斩获亚军，本科生组冠军。",
    "hl.tt.d4": "代表球队通过公开答辩，成功为团队赢得 2025 年树礼书院「优秀运动团体」奖学金。",

    "hl.volunteer_title": "社区服务与志愿活动",
    "hl.volunteer.date": "2018 年 – 至今",
    "hl.volunteer.d1": "在深圳博物馆担任小小讲解员（2018–2023 年）。",
    "hl.volunteer.d2": "在多项大型活动中担任接待或引导志愿者：第十五届全国运动会（2025 年）、第五届海峡两岸学生棒球联赛总决赛（2024 年）、GLDC 国际标准舞锦标赛（2024 年）。",

    // Contact
    "contact.title": "联系我！",
    "contact.home_title": "联系方式",
    "contact.email.label": "邮箱",
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
    "presentation.banner": "📽️ 查看我的面试展示 PPT →",
    "presentation.download": "下载 PPTX",
    "ppt.pw.title": "密码验证",
    "ppt.pw.sub": "请输入密码以查看演示文稿",
    "ppt.pw.btn": "确认",
    "ppt.pw.err": "密码错误，请重试",
    "ppt.pw.cancel": "取消",

    // Meituan Detail
    "meituan.page.title": "美团实习 — 魏宇晴",
    "meituan.detail.sub": "智能体训练助理 · 2026.06 – 2026.09 · 北京",
    "meituan.hero.title": "美团",
    "meituan.detail.company": "关于美团",
    "meituan.detail.company.desc": "美团是中国领先的生活服务电商平台，成立于 2010 年，于香港联交所上市（3690.HK）。年交易用户数超过 7 亿，业务覆盖外卖配送、到店餐饮、酒店旅游、零售等多个领域。作为世界 500 强企业，美团也是 AI 与无人配送领域的重要力量——运营着全球规模最大的实时调度系统之一，并大力投入基于大语言模型的智能体技术，推动服务行业的智能化转型。",
    "meituan.detail.overview": "我的实习",
    "meituan.detail.overview.desc": "在美团实习期间，我负责优化部署在生产业务流程中的 AI 智能体——涵盖订单处理、客户沟通和内部运营等场景。我聚焦于三个核心技术挑战：Skill 执行可靠性、知识库质量、以及长记忆管理。每个方向都需要深入 Agent 内部机制、设计评估框架，并交付可量化的改进。",
    "meituan.detail.stat1.num": "4",
    "meituan.detail.stat1.label": "技术方向",
    "meituan.detail.stat2.num": "4",
    "meituan.detail.stat2.label": "评估维度",
    "meituan.detail.stat3.num": "6",
    "meituan.detail.stat3.label": "知识库质量指标",
    "meituan.problem": "问题",
    "meituan.solution": "解决方案",
    "meituan.skill.title": "Skill 执行优化",
    "meituan.skill.problem": "Skill 执行不稳定，不同使用场景和触发模式下成功率不一致。",
    "meituan.skill.s1": "用基于触发词的 Prompt 测试每个 Skill，覆盖典型用例和边界情况",
    "meituan.skill.s2": "从 4 个维度评估：工具调用、意图识别、回复流畅度、输出质量",
    "meituan.skill.s3": "合并 / 拆分重叠 Skill，减少冲突和误触发",
    "meituan.skill.s4": "将错误分类（SSO / CIBA / 白名单），并向开发团队提交结构化反馈报告",
    "meituan.kb.title": "知识库质量工程",
    "meituan.kb.problem": "回答内部政策问题时，Agent 依赖模型记忆而非检索，导致回复过时或产生幻觉。",
    "meituan.kb.s1": "决策纠正 Skill：一个元 Skill，检测检索与记忆冲突，当检测到政策类问题时强制触发知识库查询",
    "meituan.kb.s2": "本体驱动的知识组织：基于实体–关系–动作框架构建企业知识结构，确保语义相似查询的检索一致性",
    "meituan.kb.s3": "知识库评估套件 —— 双基准架构：",
    "meituan.kb.fixed_label": "固定基线集",
    "meituan.kb.fixed_desc": "锁定核心场景，确保纵向可比性。高频查询 + 文档回溯推导 + 人工设计的边界用例。",
    "meituan.kb.dynamic_label": "动态实时集",
    "meituan.kb.dynamic_desc": "覆盖新兴问题，确保横向敏感性。线上 Bad/Good Case + 用户查询采样 + 知识库更新回溯。",
    "meituan.kb.m1": "回复有据可查",
    "meituan.kb.m2": "匹配查询意图",
    "meituan.kb.m3": "无无关信息",
    "meituan.kb.m4": "全量相关召回",
    "meituan.kb.m5": "信息时效性",
    "meituan.kb.m6": "准确性 · 合规性 · 采纳率",
    "meituan.kb.m1_name": "忠实度",
    "meituan.kb.m2_name": "相关性",
    "meituan.kb.m3_name": "精确率",
    "meituan.kb.m4_name": "召回率",
    "meituan.kb.m5_name": "时效性",
    "meituan.kb.m6_name": "业务影响",
    "meituan.memory.title": "长记忆架构设计",
    "meituan.memory.problem": "长期记忆增长过大超出上下文窗口，导致溢出、延迟增加和当前任务注意力分散。",
    "meituan.memory.tree_title": "📂 目录树",
    "meituan.memory.tree_desc": "分层存储。主索引驻留在上下文中，记录各类别对应的分区。用户偏好和历史决策按类别拆分为独立子文件。上下文仅加载索引，不加载全部记忆内容。",
    "meituan.memory.load_title": "🔄 渐进加载",
    "meituan.memory.load_desc": "按需检索。读取索引定位目标分区，仅获取所需内容。使用后立即释放——不长期占用上下文窗口。全部记忆保持可寻址，上下文窗口始终保持轻量。",
    "meituan.rbac.title": "RBAC 权限架构",
    "meituan.rbac.problem": "缺乏完善的访问控制机制，对 Agent 提示词、Skill 和部署配置的未授权变更可能中断生产流程并引入安全风险。",
    "meituan.rbac.solution": "跨团队协作，为 Agent 平台定义了一套四角色访问控制模型。每个角色映射到特定权限，建立清晰的操作边界和多租户安全基线：",
    "meituan.rbac.r1_name": "Owner",
    "meituan.rbac.r1_desc": "全平台控制、系统配置、审计权限",
    "meituan.rbac.r2_name": "训练师",
    "meituan.rbac.r2_desc": "提示词与 Skill 管理、知识库编辑、Agent 调优",
    "meituan.rbac.r3_name": "权限管理员",
    "meituan.rbac.r3_desc": "角色分配、权限策略配置、安全审计",
    "meituan.rbac.r4_name": "用户",
    "meituan.rbac.r4_desc": "仅 Agent 交互，无配置权限",
    "meituan.detail.takeaway": "关键收获",
    "meituan.detail.takeaway.desc": "1. 生产环境中的 AI Agent ≠ Demo。真实部署需要稳健的评估、监控和迭代循环，单靠一个 Prompt 模板远远不够——你需要一套系统。2. 数据驱动闭环。演化看板和知识库评估套件将 Agent 优化从「凭感觉」转变为可度量、可复现的流程，每次变更都有追踪和验证。3. 记忆是架构，不是存储。目录树 + 渐进加载模式在不丢失信息保真度的前提下解决了上下文溢出。全部记忆可寻址，上下文窗口保持轻量。4. 安全随角色扩展。四角色 RBAC 模型建立了清晰边界：Owner、训练师、权限管理员和用户——确保平台上每个操作都经过授权且可审计。",
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

  // Language-switched images — lazy load only the active language
  document.querySelectorAll('[data-i18n-img]').forEach(img => {
    const imgLang = img.getAttribute('data-i18n-img');
    const isActive = imgLang === lang;
    img.classList.toggle('active', isActive);
    // Only set src when active (avoids downloading hidden images)
    if (isActive && !img.src && img.dataset.src) {
      img.src = img.dataset.src;
    }
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
