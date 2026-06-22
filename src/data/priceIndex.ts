// 价格指数与行业资讯数据

export interface PricePoint {
  month: string;
  price: number;
}

export interface PriceIndexSeries {
  id: string;
  model: string;
  category: string;
  currentPrice: number;
  unit: string;
  changePercent: number;
  trend: PricePoint[];
}

export const priceIndexSeries: PriceIndexSeries[] = [
  {
    id: "pi-h100",
    model: "H100 80GB SXM5",
    category: "GPU 模组",
    currentPrice: 23500,
    unit: "美元/卡/月",
    changePercent: 38.2,
    trend: [
      { month: "2025-04", price: 17000 },
      { month: "2025-06", price: 18200 },
      { month: "2025-08", price: 19500 },
      { month: "2025-10", price: 17000 },
      { month: "2025-12", price: 19800 },
      { month: "2026-02", price: 22200 },
      { month: "2026-04", price: 23500 },
    ],
  },
  {
    id: "pi-h200",
    model: "H200 141GB SXM5",
    category: "GPU 模组",
    currentPrice: 31200,
    unit: "美元/卡/月",
    changePercent: 24.8,
    trend: [
      { month: "2025-04", price: 25000 },
      { month: "2025-06", price: 26200 },
      { month: "2025-08", price: 27500 },
      { month: "2025-10", price: 28200 },
      { month: "2025-12", price: 29500 },
      { month: "2026-02", price: 30400 },
      { month: "2026-04", price: 31200 },
    ],
  },
  {
    id: "pi-a100",
    model: "A100 80GB SXM4",
    category: "GPU 模组",
    currentPrice: 12800,
    unit: "美元/卡/月",
    changePercent: -8.4,
    trend: [
      { month: "2025-04", price: 14200 },
      { month: "2025-06", price: 13900 },
      { month: "2025-08", price: 13500 },
      { month: "2025-10", price: 13200 },
      { month: "2025-12", price: 13000 },
      { month: "2026-02", price: 12900 },
      { month: "2026-04", price: 12800 },
    ],
  },
  {
    id: "pi-l40s",
    model: "L40S 48GB",
    category: "GPU 模组",
    currentPrice: 5800,
    unit: "美元/卡/月",
    changePercent: 12.6,
    trend: [
      { month: "2025-04", price: 5100 },
      { month: "2025-06", price: 5200 },
      { month: "2025-08", price: 5350 },
      { month: "2025-10", price: 5450 },
      { month: "2025-12", price: 5600 },
      { month: "2026-02", price: 5720 },
      { month: "2026-04", price: 5800 },
    ],
  },
  {
    id: "pi-h100-used",
    model: "二手 H100 模组",
    category: "二手 GPU",
    currentPrice: 18500,
    unit: "美元/卡",
    changePercent: 62.0,
    trend: [
      { month: "2025-04", price: 11400 },
      { month: "2025-06", price: 12800 },
      { month: "2025-08", price: 14200 },
      { month: "2025-10", price: 15500 },
      { month: "2025-12", price: 16800 },
      { month: "2026-02", price: 17800 },
      { month: "2026-04", price: 18500 },
    ],
  },
  {
    id: "pi-cpu-server",
    model: "2U CPU 服务器（通用）",
    category: "CPU 服务器",
    currentPrice: 42000,
    unit: "元/台",
    changePercent: -3.2,
    trend: [
      { month: "2025-04", price: 43800 },
      { month: "2025-06", price: 43500 },
      { month: "2025-08", price: 43000 },
      { month: "2025-10", price: 42500 },
      { month: "2025-12", price: 42200 },
      { month: "2026-02", price: 42100 },
      { month: "2026-04", price: 42000 },
    ],
  },
];

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  source: string;
  readTime: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "news-001",
    title: "GB 46864-2025 数据清除新标准 2027 年实施，AI 服务器首次纳入管控",
    category: "政策解读",
    summary:
      "GB 46864-2025《数据安全技术 电子产品信息清除技术要求》将于 2027 年 1 月 1 日实施，要求电子产品使用数据覆写和指令清理技术进行信息清除。AI 服务器首次被纳入废弃电子产品管控范围。",
    date: "2026-03-15",
    source: "算力巢研究院",
    readTime: "5 分钟",
  },
  {
    id: "news-002",
    title: "2026 Q1 国内 AI 算力需求同比暴涨 417%，供需缺口持续扩大",
    category: "市场分析",
    summary:
      "2026 年 Q1 国内 AI 算力需求同比暴涨 417%，而供给增速仅 128%。H100 租赁价格从 1.70 美元/GPU/小时飙升至 2.35 美元/GPU/小时，涨幅近 40%。",
    date: "2026-03-10",
    source: "算力巢研究院",
    readTime: "8 分钟",
  },
  {
    id: "news-003",
    title: "二手 H100 模组交易量同比暴增 62%，残值交易空间巨大",
    category: "市场分析",
    summary:
      "2025 Q3 国内二手 H100 模组交易量同比暴增 62%，预计到 2026 年二手 H100 模组将占国内 AI 加速卡保有量的 28%。企业级 GPU 转售通常可回收原购买价格的 60-80%。",
    date: "2026-03-05",
    source: "算力巢研究院",
    readTime: "6 分钟",
  },
  {
    id: "news-004",
    title: "NVIDIA Blackwell B200 量产在即，Hopper 架构设备残值如何演变？",
    category: "技术趋势",
    summary:
      "随着 Blackwell B200 量产临近，Hopper 架构 H100/H200 设备面临代际迭代。残值预测模型显示，H100 在 B200 量产 6 个月后残值或下降 15-20%。",
    date: "2026-02-28",
    source: "算力巢研究院",
    readTime: "10 分钟",
  },
  {
    id: "news-005",
    title: "金融监管总局将算力中心设备纳入鼓励发展租赁物范围",
    category: "政策解读",
    summary:
      "金融监管总局已将算力中心设备纳入鼓励发展的租赁物范围，金租公司入局加速。兴业金租已完成 5 亿元 GPU 算力设备融资租赁业务。",
    date: "2026-02-20",
    source: "算力巢研究院",
    readTime: "4 分钟",
  },
  {
    id: "news-006",
    title: "绿色算力租赁占比突破 45%，碳足迹追踪成为采购核心考量",
    category: "技术趋势",
    summary:
      "绿色算力租赁占比从 2022 年的 22% 提升至 2025 年的 45%，预计 2027 年突破 60%。78% 的企业将低碳属性作为算力租赁的核心考量因素。",
    date: "2026-02-15",
    source: "算力巢研究院",
    readTime: "7 分钟",
  },
];
