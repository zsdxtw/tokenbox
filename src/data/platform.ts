// 算力交易、招标集采、增值服务、卖家数据

// 算力提供商类型：大型智算中心 / 个体闲散算力
export type ComputeProviderType = "center" | "individual";

export interface ComputeListing {
  id: string;
  gpuModel: string;
  gpuCount: number;
  vram: string;
  region: string;
  availableHours: string;
  pricePerHour: number;
  unit: string;
  interconnect: string;
  provider: string;
  providerType: ComputeProviderType;
  rating: number;
  greenEnergy: boolean;
  // 是否支持下单时指定安装模型并交付 API
  supportCustomModel: boolean;
}

// Token 型算力交易：直接输出大模型 Token，按用量计费并交付 API 接口
export interface TokenListing {
  id: string;
  modelName: string;
  modelVersion: string;
  modelSize: string;
  contextWindow: string;
  gpuModel: string;
  gpuCount: number;
  region: string;
  pricePerMillionTokens: number;
  unit: string;
  provider: string;
  providerType: ComputeProviderType;
  rating: number;
  greenEnergy: boolean;
  apiEndpoint: string;
  throughput: string;
  features: string[];
}

export const computeListings: ComputeListing[] = [
  {
    id: "cp-001",
    gpuModel: "H100 SXM5 80GB",
    gpuCount: 8,
    vram: "640GB",
    region: "北京·亦庄",
    availableHours: "24×7",
    pricePerHour: 18.8,
    unit: "元/卡/小时",
    interconnect: "400G NDR IB",
    provider: "北方智算中心",
    providerType: "center",
    rating: 4.9,
    greenEnergy: true,
    supportCustomModel: true,
  },
  {
    id: "cp-002",
    gpuModel: "A100 SXM4 80GB",
    gpuCount: 8,
    vram: "640GB",
    region: "上海·临港",
    availableHours: "工作日 8-22",
    pricePerHour: 9.6,
    unit: "元/卡/小时",
    interconnect: "200G HDR IB",
    provider: "华东算力调度中心",
    providerType: "center",
    rating: 4.7,
    greenEnergy: true,
    supportCustomModel: true,
  },
  {
    id: "cp-003",
    gpuModel: "L40S 48GB",
    gpuCount: 8,
    vram: "384GB",
    region: "杭州·余杭",
    availableHours: "24×7",
    pricePerHour: 4.2,
    unit: "元/卡/小时",
    interconnect: "100GbE",
    provider: "西湖智算",
    providerType: "center",
    rating: 4.6,
    greenEnergy: false,
    supportCustomModel: true,
  },
  {
    id: "cp-004",
    gpuModel: "H100 PCIe 80GB",
    gpuCount: 4,
    vram: "320GB",
    region: "成都·高新",
    availableHours: "24×7",
    pricePerHour: 16.5,
    unit: "元/卡/小时",
    interconnect: "100GbE",
    provider: "西部算力枢纽",
    providerType: "center",
    rating: 4.5,
    greenEnergy: true,
    supportCustomModel: true,
  },
  {
    id: "cp-005",
    gpuModel: "A100 SXM4 40GB",
    gpuCount: 8,
    vram: "320GB",
    region: "贵州·贵安",
    availableHours: "24×7",
    pricePerHour: 6.8,
    unit: "元/卡/小时",
    interconnect: "200G HDR IB",
    provider: "贵安数据中心",
    providerType: "center",
    rating: 4.4,
    greenEnergy: true,
    supportCustomModel: false,
  },
  {
    id: "cp-006",
    gpuModel: "H20 96GB",
    gpuCount: 8,
    vram: "768GB",
    region: "深圳·南山",
    availableHours: "工作日全天",
    pricePerHour: 12.5,
    unit: "元/卡/小时",
    interconnect: "200G RoCE",
    provider: "南方智算",
    providerType: "center",
    rating: 4.8,
    greenEnergy: false,
    supportCustomModel: true,
  },
  {
    id: "cp-007",
    gpuModel: "RTX 4090 24GB",
    gpuCount: 2,
    vram: "48GB",
    region: "南京·江宁",
    availableHours: "夜间 20:00-08:00",
    pricePerHour: 2.8,
    unit: "元/卡/小时",
    interconnect: "10GbE",
    provider: "张工（个人工作室）",
    providerType: "individual",
    rating: 4.3,
    greenEnergy: false,
    supportCustomModel: true,
  },
  {
    id: "cp-008",
    gpuModel: "RTX 3090 24GB",
    gpuCount: 4,
    vram: "96GB",
    region: "武汉·光谷",
    availableHours: "周末全天",
    pricePerHour: 1.9,
    unit: "元/卡/小时",
    interconnect: "10GbE",
    provider: "李同学（高校实验室）",
    providerType: "individual",
    rating: 4.2,
    greenEnergy: false,
    supportCustomModel: true,
  },
];

// Token 型算力交易列表
export const tokenListings: TokenListing[] = [
  {
    id: "tk-001",
    modelName: "DeepSeek-V3",
    modelVersion: "v3-0324",
    modelSize: "671B (MoE)",
    contextWindow: "128K",
    gpuModel: "H100 SXM5 80GB × 8",
    gpuCount: 8,
    region: "北京·亦庄",
    pricePerMillionTokens: 4.0,
    unit: "元/百万 Tokens",
    provider: "北方智算中心",
    providerType: "center",
    rating: 4.9,
    greenEnergy: true,
    apiEndpoint: "https://api.compute-nest.cn/v1/north/deepseek-v3",
    throughput: "180 tokens/s",
    features: ["兼容 OpenAI 接口", "Function Calling", "JSON 输出", "流式响应"],
  },
  {
    id: "tk-002",
    modelName: "Qwen2.5-72B",
    modelVersion: "qwen2.5-72b-instruct",
    modelSize: "72B",
    contextWindow: "128K",
    gpuModel: "A100 SXM4 80GB × 8",
    gpuCount: 8,
    region: "上海·临港",
    pricePerMillionTokens: 2.8,
    unit: "元/百万 Tokens",
    provider: "华东算力调度中心",
    providerType: "center",
    rating: 4.7,
    greenEnergy: true,
    apiEndpoint: "https://api.compute-nest.cn/v1/east/qwen-72b",
    throughput: "150 tokens/s",
    features: ["兼容 OpenAI 接口", "多语言", "代码生成", "流式响应"],
  },
  {
    id: "tk-003",
    modelName: "Llama 3.1-70B",
    modelVersion: "llama-3.1-70b-instruct",
    modelSize: "70B",
    contextWindow: "128K",
    gpuModel: "L40S 48GB × 8",
    gpuCount: 8,
    region: "杭州·余杭",
    pricePerMillionTokens: 3.2,
    unit: "元/百万 Tokens",
    provider: "西湖智算",
    providerType: "center",
    rating: 4.6,
    greenEnergy: false,
    apiEndpoint: "https://api.compute-nest.cn/v1/westlake/llama-70b",
    throughput: "140 tokens/s",
    features: ["兼容 OpenAI 接口", "开源模型", "可微调", "流式响应"],
  },
  {
    id: "tk-004",
    modelName: "GLM-4-9B",
    modelVersion: "glm-4-9b-chat",
    modelSize: "9B",
    contextWindow: "128K",
    gpuModel: "RTX 4090 24GB × 2",
    gpuCount: 2,
    region: "南京·江宁",
    pricePerMillionTokens: 0.8,
    unit: "元/百万 Tokens",
    provider: "张工（个人工作室）",
    providerType: "individual",
    rating: 4.3,
    greenEnergy: false,
    apiEndpoint: "https://api.compute-nest.cn/v1/indie/zhang-glm4",
    throughput: "95 tokens/s",
    features: ["兼容 OpenAI 接口", "中文优化", "夜间可用", "流式响应"],
  },
  {
    id: "tk-005",
    modelName: "Qwen2.5-7B",
    modelVersion: "qwen2.5-7b-instruct",
    modelSize: "7B",
    contextWindow: "128K",
    gpuModel: "RTX 3090 24GB × 4",
    gpuCount: 4,
    region: "武汉·光谷",
    pricePerMillionTokens: 0.6,
    unit: "元/百万 Tokens",
    provider: "李同学（高校实验室）",
    providerType: "individual",
    rating: 4.2,
    greenEnergy: false,
    apiEndpoint: "https://api.compute-nest.cn/v1/indie/li-qwen7b",
    throughput: "110 tokens/s",
    features: ["兼容 OpenAI 接口", "周末可用", "学生优惠", "流式响应"],
  },
  {
    id: "tk-006",
    modelName: "DeepSeek-R1",
    modelVersion: "r1-0528",
    modelSize: "671B (MoE)",
    contextWindow: "128K",
    gpuModel: "H20 96GB × 8",
    gpuCount: 8,
    region: "深圳·南山",
    pricePerMillionTokens: 6.0,
    unit: "元/百万 Tokens",
    provider: "南方智算",
    providerType: "center",
    rating: 4.8,
    greenEnergy: false,
    apiEndpoint: "https://api.compute-nest.cn/v1/south/deepseek-r1",
    throughput: "120 tokens/s",
    features: ["兼容 OpenAI 接口", "推理增强", "思维链输出", "流式响应"],
  },
];

export interface BiddingProject {
  id: string;
  title: string;
  buyer: string;
  budget: number;
  budgetLabel: string;
  deliveryDate: string;
  publishDate: string;
  deadline: string;
  status: "bidding" | "evaluating" | "awarded";
  statusLabel: string;
  bidderCount: number;
  description: string;
  requirements: string[];
}

export const biddingProjects: BiddingProject[] = [
  {
    id: "bd-001",
    title: "智算中心一期 64 卡 H100 训练集群采购",
    buyer: "某省级智算中心",
    budget: 22800000,
    budgetLabel: "2,280 万元",
    deliveryDate: "2026-06-30",
    publishDate: "2026-03-15",
    deadline: "2026-04-15",
    status: "bidding",
    statusLabel: "竞价中",
    bidderCount: 5,
    description: "采购 8 台 HGX H100 8卡训练整机，含组网、安装调试与 3 年维保。",
    requirements: ["HGX H100 SXM5 80GB", "NDR IB 组网", "含安装调试", "3 年原厂维保"],
  },
  {
    id: "bd-002",
    title: "高校 AI 实验室 8 卡 A100 推理服务器采购",
    buyer: "某 985 高校",
    budget: 980000,
    budgetLabel: "98 万元",
    deliveryDate: "2026-05-20",
    publishDate: "2026-03-10",
    deadline: "2026-04-05",
    status: "bidding",
    statusLabel: "竞价中",
    bidderCount: 8,
    description: "采购 1 台 A100 8卡推理服务器，预算有限，接受认证二手设备。",
    requirements: ["A100 80GB SXM4", "1TB 内存", "200G IB", "可接受二手认证"],
  },
  {
    id: "bd-003",
    title: "企业推理集群 L40S 服务器批量采购",
    buyer: "某 AI 应用企业",
    budget: 3600000,
    budgetLabel: "360 万元",
    deliveryDate: "2026-05-15",
    publishDate: "2026-03-01",
    deadline: "2026-03-25",
    status: "evaluating",
    statusLabel: "评标中",
    bidderCount: 6,
    description: "采购 5 台 L40S 8卡推理服务器，用于大模型在线推理服务。",
    requirements: ["L40S 48GB", "512GB 内存", "100GbE", "含部署"],
  },
];

export interface GroupBuyProject {
  id: string;
  title: string;
  targetModel: string;
  unitPrice: number;
  originalPrice: number;
  targetQuantity: number;
  currentQuantity: number;
  participantCount: number;
  discount: string;
  deadline: string;
  tiers: { quantity: number; discount: string }[];
}

export const groupBuyProjects: GroupBuyProject[] = [
  {
    id: "gb-001",
    title: "H100 8卡训练整机联合集采",
    targetModel: "HGX H100 8GPU",
    unitPrice: 2680000,
    originalPrice: 2850000,
    targetQuantity: 20,
    currentQuantity: 14,
    participantCount: 6,
    discount: "6.0%",
    deadline: "2026-04-20",
    tiers: [
      { quantity: 5, discount: "3%" },
      { quantity: 10, discount: "5%" },
      { quantity: 20, discount: "6%" },
      { quantity: 50, discount: "8%" },
    ],
  },
  {
    id: "gb-002",
    title: "Samsung 30.72TB NVMe SSD 批量拼单",
    targetModel: "PM9A3-30T",
    unitPrice: 25800,
    originalPrice: 28500,
    targetQuantity: 100,
    currentQuantity: 62,
    participantCount: 11,
    discount: "9.5%",
    deadline: "2026-04-10",
    tiers: [
      { quantity: 20, discount: "5%" },
      { quantity: 50, discount: "7%" },
      { quantity: 100, discount: "9.5%" },
      { quantity: 200, discount: "12%" },
    ],
  },
  {
    id: "gb-003",
    title: "Mellanox 200G IB 交换机集采",
    targetModel: "QM3700-32F",
    unitPrice: 168000,
    originalPrice: 195000,
    targetQuantity: 10,
    currentQuantity: 7,
    participantCount: 4,
    discount: "13.8%",
    deadline: "2026-04-05",
    tiers: [
      { quantity: 3, discount: "8%" },
      { quantity: 5, discount: "10%" },
      { quantity: 10, discount: "13.8%" },
    ],
  },
];

export interface ValueService {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  billing: string;
  process: string[];
  standard?: string;
}

export const valueServices: ValueService[] = [
  {
    id: "vs-001",
    name: "验机质检",
    icon: "ShieldCheck",
    tagline: "二手交易信任机制核心",
    description:
      "平台建立标准化质检流程，覆盖 GPU 服务器、CPU 服务器、网络设备、存储设备等主要品类。每台通过质检的设备生成唯一质检报告编号，买家可在线查看完整检测数据。",
    billing: "按台计费，GPU 服务器 2,000-5,000 元/台；其他设备 500-2,000 元/台",
    process: ["设备寄送/上门质检", "标准化检测", "生成质检报告", "认证标识上架"],
  },
  {
    id: "vs-002",
    name: "物流配送",
    icon: "Truck",
    tagline: "专业 IT 设备门到门运输",
    description:
      "平台接入专业 IT 设备物流商，提供门到门运输服务。GPU 服务器等高价值设备支持专车运输、防震包装、全程温控。大件设备支持含安装的一站式交付。",
    billing: "按距离与重量计费，专车运输另议",
    process: ["下单预约", "专业包装", "专车/快递运输", "签收确认"],
  },
  {
    id: "vs-003",
    name: "安装调试",
    icon: "Wrench",
    tagline: "认证工程师团队上门部署",
    description:
      "平台联合认证工程师团队，提供设备上架、网络配置、系统安装、压力测试等安装调试服务。GPU 服务器集群支持整机架交付和集群联调。",
    billing: "按设备类型与工时计费，1,500-8,000 元/台",
    process: ["预约上门", "设备上架", "网络/系统配置", "压力测试验收"],
  },
  {
    id: "vs-004",
    name: "残值评估",
    icon: "Calculator",
    tagline: "智能定价模型提供估价参考",
    description:
      "平台基于设备品类、使用年限、性能参数、市场供需的智能定价模型，为卖家提供定价建议，为买家提供价格参考。",
    billing: "免费估价；详细评估报告 500-2,000 元/份",
    process: ["设备信息录入", "智能模型估价", "生成评估报告", "定价建议"],
  },
  {
    id: "vs-005",
    name: "数据清除",
    icon: "FileCheck",
    tagline: "符合 GB 46864-2025 标准",
    description:
      "二手设备交易和回收处置的合规必备服务。平台提供符合 GB 46864-2025 标准的数据清除服务，包括数据覆写、固件重置、物理销毁，生成数据清除认证报告。",
    billing: "逻辑清除 200-500 元/台；物理销毁 500-1,500 元/台",
    process: ["设备登记", "数据覆写≥2次", "固件重置", "生成认证报告"],
    standard: "GB 46864-2025",
  },
  {
    id: "vs-006",
    name: "维修维保",
    icon: "Settings",
    tagline: "芯片级维修能力核心壁垒",
    description:
      "平台联合认证维修商，提供 GPU 服务器、网络设备等维修维保服务。支持年度维保合约和单次维修。芯片级维修能力是核心壁垒（全国具备此能力的团队不足 10 家）。",
    billing: "年度维保 5,000-30,000 元/卡；单次维修按故障评估",
    process: ["故障申报", "远程诊断", "上门/寄修", "测试验收"],
  },
];

export interface Seller {
  id: string;
  name: string;
  type: string;
  creditRating: number;
  transactionCount: number;
  totalAmount: number;
  certifications: string[];
  location: string;
  established: string;
  description: string;
  productCount: number;
}

export const sellers: Seller[] = [
  {
    id: "slr-001",
    name: "算力巢自营",
    type: "平台自营",
    creditRating: 5,
    transactionCount: 1280,
    totalAmount: 386000000,
    certifications: ["平台自营", "原厂授权", "ISO 9001", "ISO 27001"],
    location: "北京·亦庄",
    established: "2026-01",
    description:
      "算力巢平台自营店，提供一手自营直采与二手翻新认证设备。所有二手设备经平台质检中心认证，享受平台质保与残值担保。",
    productCount: 28,
  },
  {
    id: "slr-002",
    name: "Supermicro 官方旗舰店",
    type: "品牌商",
    creditRating: 5,
    transactionCount: 456,
    totalAmount: 128000000,
    certifications: ["品牌官方", "原厂保修", "ISO 9001"],
    location: "深圳·南山",
    established: "2026-02",
    description: "Supermicro 官方授权店铺，提供 GPU 服务器、CPU 服务器等全品类产品。",
    productCount: 42,
  },
  {
    id: "slr-003",
    name: "华东智算回收",
    type: "回收商",
    creditRating: 4,
    transactionCount: 218,
    totalAmount: 32000000,
    certifications: ["回收资质", "数据清除认证"],
    location: "上海·临港",
    established: "2026-01",
    description: "专业算力设备回收商，专注退役 GPU 服务器回收与再流通。",
    productCount: 18,
  },
  {
    id: "slr-004",
    name: "浪潮信息官方店",
    type: "品牌商",
    creditRating: 5,
    transactionCount: 342,
    totalAmount: 86000000,
    certifications: ["品牌官方", "原厂保修"],
    location: "济南·高新",
    established: "2026-02",
    description: "浪潮信息官方授权店，提供国产算力服务器与存储产品。",
    productCount: 35,
  },
];
