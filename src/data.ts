export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  result: string;
  image: string;
}

export const PERSONAL_INFO = {
  name: "颜孟佳 | Mengjia Yan",
  phone: "18506900776",
  email: "18506900776@163.com",
  wechat: "wxid_t5wa4ame24p322",
  direction: "用户体验设计（UX）/ 交互设计 / 用户研究 / 产品设计 / AI应用相关岗位",
  cities: ["杭州", "深圳", "福州"],
};

export const EDUCATION = [
  {
    school: "爱丁堡大学 (University of Edinburgh)",
    degree: "信息设计 硕士 (MSc Information Design)",
    period: "2025.09 - 2026.11 (预计)",
    courses: ["Design with Data", "Data Science for Design", "Histories and Futures of Technology"],
    projects: ["FriendBox", "TouchBack"]
  },
  {
    school: "中国美术学院 (China Academy of Art)",
    degree: "产品设计 学士",
    period: "2021.09 - 2025.06",
    details: "智能硬件原型开发、人本人工智能设计、系统设计",
    english: "CET-4 515, IELTS 6.5"
  }
];

export const EXPERIENCE = [
  {
    company: "安踏 (ANTA)",
    role: "设计实习生",
    period: "2024.07 - 2024.09",
    tasks: [
      "参与多款安踏易穿脱儿童鞋设计，参与中国丝绸博物馆联名系列鞋设计",
      "参与巴黎走秀相关设计工作",
      "参与A-Lab未来工作坊店铺室内搭建尝试"
    ]
  },
  {
    company: "华映科技",
    role: "设计实习生",
    period: "2023.07 - 2023.08",
    tasks: [
      "学习屏幕界面实体制造流程与机械理论基础",
      "参与工厂调研、会展布局设计及落地布置"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "friendbox",
    title: "FriendBox",
    category: "爱丁堡艺术节双人盲盒推荐",
    description: "面向艺术节观众的双人社交推荐应用，基于偏好进行智能推荐。",
    role: "独立设计与开发（数据分析、推荐逻辑、移动端UI/UX）",
    result: "实现“朋友共选盲盒”的互动体验，提升选择效率与趣味性",
    image: "https://picsum.photos/seed/friendbox/800/600"
  },
  {
    id: "touchback",
    title: "TouchBack",
    category: "辅助拉伸智能穿戴",
    description: "融合硬件与交互引导的智能穿戴产品。",
    role: "IMU角度检测、触摸/震动模块联动、Arduino编程、物理原型制作",
    result: "形成可执行的拉伸引导流程，支持分组训练与节奏反馈",
    image: "https://picsum.photos/seed/touchback/800/600"
  },
  {
    id: "wenji",
    title: "文迹",
    category: "非遗文化体验旅行平台",
    description: "为旅行者提供非遗文化体验路线与智能行程规划。",
    role: "服务蓝图、用户旅程、AI行程推荐（接入ChatGPT）、前后端联动设计",
    result: "完成“节日浏览-行程制定-记录分享-文创购买”的完整体验闭环",
    image: "https://picsum.photos/seed/wenji/800/600"
  },
  {
    id: "charcoal",
    title: "活性炭产品设计",
    category: "可持续家居",
    description: "将活性炭吸附能力与花瓶场景融合，解决居家空气质量问题。",
    role: "工业设计、模块化设计",
    result: "通过磁吸拼接实现耗材模块可替换设计，增强可持续与易维护性",
    image: "https://picsum.photos/seed/charcoal/800/600"
  },
  {
    id: "biomimetic",
    title: "振翅飞行器",
    category: "仿生+AI生成",
    description: "使用Stable Diffusion、Runway进行外观与场景探索。",
    role: "AIGC探索、概念设计",
    result: "面向城市生态场景，获得GCROSS国际创意奖银奖",
    image: "https://picsum.photos/seed/flight/800/600"
  },
  {
    id: "ai-ux-research",
    title: "AI驱动用户研究工具",
    category: "AI应用探索",
    description: "利用大语言模型自动化分析定性访谈数据，提取关键洞察。",
    role: "Prompt Engineering, 流程设计",
    result: "大幅缩短访谈整理时间，提高洞察提取的准确性",
    image: "https://picsum.photos/seed/aiux/800/600"
  }
];

export const SKILLS = {
  design: ["Figma", "Sketch", "Photoshop", "Illustrator", "After Effects", "Rhino/Blender"],
  methods: ["用户访谈", "可用性测试", "问卷调查", "竞品分析", "用户画像", "用户旅程图", "服务蓝图"],
  tech: ["Arduino", "HTML/CSS/JS", "Python", "Stable Diffusion", "Runway", "GPT-4", "Midjourney", "Gemini", "Sora"]
};
