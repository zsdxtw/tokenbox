// 解决方案与案例数据（公司自营内容）

export interface SolutionScenario {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  category: string;
  description: string;
  highlights: string[];
  scope: string[];
  deliverables: string[];
  partners: string[];
  duration: string;
}

export interface SolutionCase {
  id: string;
  title: string;
  scenario: string;
  client: string;
  industry: string;
  location: string;
  completionDate: string;
  scale: string;
  summary: string;
  results: { label: string; value: string }[];
  tags: string[];
}

// 解决方案场景
export const solutionScenarios: SolutionScenario[] = [
  {
    id: "sol-001",
    name: "智算集群中心建设",
    icon: "Server",
    tagline: "从选址到上线的全栈交付",
    category: "基础设施建设",
    description:
      "为政府、企业、高校提供从选址规划、电力配套、机房建设到 GPU 集群部署、组网调优的全栈智算中心建设方案。覆盖千卡到万卡级集群，交付即可投入大模型训练与推理。",
    highlights: ["千卡到万卡规模", "全栈一站式交付", "NDR IB 组网", "PUE < 1.25"],
    scope: [
      "选址规划与可行性研究",
      "电力配套与制冷系统设计",
      "机房改造与机柜部署",
      "GPU 服务器集群采购与上架",
      "InfiniBand/RoCE 高速组网",
      "集群软件栈部署与调优",
    ],
    deliverables: [
      "智算中心建设可研报告",
      "全套设备采购清单与集采方案",
      "集群部署与联调验收报告",
      "运维手册与培训",
    ],
    partners: ["Supermicro", "浪潮信息", "NVIDIA", "维谛技术", "施耐德电气"],
    duration: "6-12 个月",
  },
  {
    id: "sol-002",
    name: "绿色供电解决方案",
    icon: "Leaf",
    tagline: "低碳算力的电力保障方案",
    category: "绿色低碳",
    description:
      "联合电力设备厂商与绿电供应商，为算力中心提供风光绿电接入、储能配套、UPS 不间断电源、智能配电的一体化绿色供电方案，助力算力中心 PUE 优化与碳足迹降低。",
    highlights: ["绿电接入", "储能配套", "PUE 优化", "碳足迹追踪"],
    scope: [
      "绿电采购与接入方案",
      "储能系统配置",
      "UPS 与柴发后备电源",
      "智能配电与动环监控",
      "碳排放监测与报告",
    ],
    deliverables: [
      "绿色供电方案设计书",
      "电力设备采购与安装",
      "碳足迹认证报告",
      "能效优化建议书",
    ],
    partners: ["施耐德电气", "宁德时代", "国家电网", "金风科技"],
    duration: "3-6 个月",
  },
  {
    id: "sol-003",
    name: "GPU 算力租赁运营",
    icon: "Cpu",
    tagline: "闲置算力变现与运营托管",
    category: "算力运营",
    description:
      "为拥有 GPU 设备的企业、矿场、高校提供算力租赁运营托管服务。平台负责设备上架、模型部署、API 接口开放、用户运营与计费结算，帮助设备方快速变现闲置算力。",
    highlights: ["闲置算力变现", "全托管运营", "API 自动交付", "按量结算"],
    scope: [
      "设备评估与上架",
      "大模型部署与 API 开放",
      "用户运营与流量导入",
      "计量计费与结算",
      "运维监控与故障处理",
    ],
    deliverables: [
      "算力上架与定价方案",
      "API 接口与计费系统",
      "运营数据看板",
      "月度结算报表",
    ],
    partners: ["北方智算中心", "华东算力调度中心"],
    duration: "长期运营",
  },
  {
    id: "sol-004",
    name: "二手设备残值处置",
    icon: "RefreshCw",
    tagline: "退役设备的残值最大化方案",
    category: "资产处置",
    description:
      "为企业退役的 GPU 服务器、网络设备、存储设备提供残值评估、回收翻新、再流通的一站式处置方案。通过平台质检认证与二手交易市场，帮助企业最大化回收设备残值。",
    highlights: ["残值评估", "合规回收", "翻新认证", "再流通变现"],
    scope: [
      "设备残值评估与定价建议",
      "上门回收与运输",
      "数据清除（GB 46864-2025）",
      "质检翻新与认证",
      "二手市场上架销售",
    ],
    deliverables: [
      "残值评估报告",
      "数据清除认证报告",
      "质检认证报告",
      "处置结算清单",
    ],
    partners: ["华东智算回收", "持证电子废弃物处置企业"],
    duration: "1-3 个月",
  },
  {
    id: "sol-005",
    name: "融资租赁采购方案",
    icon: "Landmark",
    tagline: "重资产采购的金融杠杆方案",
    category: "金融服务",
    description:
      "联合金融租赁公司、商业银行，为企业 GPU 服务器、智算集群采购提供融资租赁、分期付款、设备抵押贷款等金融方案，将重资产采购转化为灵活的分期或租赁支出。",
    highlights: ["零/低首付", "灵活分期", "残值担保", "资金杠杆"],
    scope: [
      "采购需求与资金方案匹配",
      "融资租赁合同设计",
      "设备估值与残值担保",
      "贷后资产监控",
      "期满处置（留购/续租/退还）",
    ],
    deliverables: [
      "融资方案设计书",
      "金融合同模板",
      "残值担保协议",
      "贷后监控报告",
    ],
    partners: ["工银金租", "兴业金租", "招商银行", "人保财险"],
    duration: "1-3 年（租期）",
  },
  {
    id: "sol-006",
    name: "全生命周期管理",
    icon: "Activity",
    tagline: "设备从采购到退役的全程管理",
    category: "运维管理",
    description:
      "为企业的算力设备建立数字档案，通过设备指纹追踪从采购、部署、使用、维护到退役处置的完整生命周期，提供健康监控、折旧优化、退役时机建议等智能管理服务。",
    highlights: ["设备指纹", "健康监控", "折旧优化", "退役时机"],
    scope: [
      "设备指纹数据库建立",
      "IPMI/BMC 健康监控接入",
      "性能衰减预警",
      "折旧策略优化",
      "退役时机智能推荐",
    ],
    deliverables: [
      "设备数字档案系统",
      "健康监控看板",
      "折旧优化建议书",
      "退役处置方案",
    ],
    partners: ["算力巢自营"],
    duration: "长期服务",
  },
];

// 解决方案案例
export const solutionCases: SolutionCase[] = [
  {
    id: "case-001",
    title: "某省级智算中心千卡 H100 集群建设",
    scenario: "智算集群中心建设",
    client: "某省级智算中心",
    industry: "政府/公共算力",
    location: "北京·亦庄",
    completionDate: "2026-02",
    scale: "1,024 卡 H100 训练集群",
    summary:
      "为某省级智算中心提供从选址规划到集群上线的全栈建设方案，交付 1,024 卡 H100 训练集群，含 NDR IB 组网、液冷散热、绿电接入，PUE 达 1.22，交付即投入千亿参数大模型训练。",
    results: [
      { label: "集群规模", value: "1,024 卡 H100" },
      { label: "PUE", value: "1.22" },
      { label: "建设周期", value: "9 个月" },
      { label: "绿电占比", value: "65%" },
    ],
    tags: ["千卡集群", "NDR IB", "液冷", "绿电"],
  },
  {
    id: "case-002",
    title: "内蒙古风光绿电算力中心供电方案",
    scenario: "绿色供电解决方案",
    client: "内蒙古某数据中心",
    industry: "数据中心",
    location: "内蒙古·鄂尔多斯",
    completionDate: "2025-12",
    scale: "200MW 绿电接入",
    summary:
      "为内蒙古某数据中心设计风光绿电接入方案，配套 50MWh 储能系统与智能配电，绿电占比达 78%，年减碳 12 万吨，PUE 从 1.45 降至 1.28。",
    results: [
      { label: "绿电占比", value: "78%" },
      { label: "年减碳", value: "12 万吨" },
      { label: "PUE 优化", value: "1.45 → 1.28" },
      { label: "储能容量", value: "50MWh" },
    ],
    tags: ["风光绿电", "储能", "碳减排", "PUE 优化"],
  },
  {
    id: "case-003",
    title: "某 AI 企业闲置 GPU 算力托管运营",
    scenario: "GPU 算力租赁运营",
    client: "某 AI 应用企业",
    industry: "AI/互联网",
    location: "杭州·余杭",
    completionDate: "2026-01",
    scale: "64 卡 A100 算力托管",
    summary:
      "为某 AI 企业闲置的 64 卡 A100 服务器提供算力托管运营服务，平台部署 DeepSeek、Qwen 等大模型并开放 API，3 个月内实现算力利用率从 35% 提升至 92%，月增收 28 万元。",
    results: [
      { label: "算力利用率", value: "35% → 92%" },
      { label: "月增收", value: "28 万元" },
      { label: "上线周期", value: "7 天" },
      { label: "API 调用量", value: "日均 120 万次" },
    ],
    tags: ["算力托管", "API 运营", "利用率提升"],
  },
  {
    id: "case-004",
    title: "某互联网企业退役 H100 集群残值处置",
    scenario: "二手设备残值处置",
    client: "某互联网企业",
    industry: "互联网",
    location: "上海·临港",
    completionDate: "2026-03",
    scale: "32 台 H100 8卡服务器",
    summary:
      "为某互联网企业退役的 32 台 H100 8卡服务器提供残值处置方案，经平台质检认证后上架二手市场，平均回收原价 68%，较企业内部折旧处置多回收 420 万元。",
    results: [
      { label: "回收比例", value: "原价 68%" },
      { label: "多回收", value: "420 万元" },
      { label: "处置周期", value: "45 天" },
      { label: "数据清除", value: "GB 46864-2025" },
    ],
    tags: ["残值处置", "质检认证", "数据清除"],
  },
  {
    id: "case-005",
    title: "某高校 AI 实验室融资租赁采购方案",
    scenario: "融资租赁采购方案",
    client: "某 985 高校",
    industry: "高校/科研",
    location: "南京·江宁",
    completionDate: "2025-11",
    scale: "8 卡 H100 融资租赁",
    summary:
      "为某 985 高校 AI 实验室设计融资租赁采购方案，首付 10% 获得 8 卡 H100 服务器使用权，36 期月租 7.2 万元，解决科研经费一次性投入压力，平台提供残值担保。",
    results: [
      { label: "首付比例", value: "10%" },
      { label: "月租金", value: "7.2 万元" },
      { label: "租期", value: "36 期" },
      { label: "残值担保", value: "原价 35%" },
    ],
    tags: ["融资租赁", "高校采购", "残值担保"],
  },
  {
    id: "case-006",
    title: "某智算中心设备全生命周期管理",
    scenario: "全生命周期管理",
    client: "某智算中心",
    industry: "智算中心",
    location: "成都·高新",
    completionDate: "2026-02",
    scale: "2,048 卡设备管理",
    summary:
      "为某智算中心 2,048 卡 GPU 设备建立设备指纹数据库与健康监控系统，通过性能衰减预警与退役时机推荐，将设备使用寿命从 4 年延长至 6 年，年节省采购成本 1,800 万元。",
    results: [
      { label: "管理规模", value: "2,048 卡" },
      { label: "寿命延长", value: "4 年 → 6 年" },
      { label: "年节省", value: "1,800 万元" },
      { label: "故障预警", value: "提前 14 天" },
    ],
    tags: ["设备指纹", "健康监控", "寿命优化"],
  },
];
