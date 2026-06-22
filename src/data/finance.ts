// 金融服务板块数据

export interface FinanceProduct {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  partner: string;
  typicalPlan: string;
  platformRole: string;
  revenue: string;
  rate: string;
  highlights: string[];
}

export const financeProducts: FinanceProduct[] = [
  {
    id: "fp-001",
    name: "融资租赁",
    icon: "Landmark",
    tagline: "零首付获得设备使用权",
    description:
      "联合金融租赁公司，为买方提供算力设备融资租赁服务。买方零首付或低首付获得设备使用权，按月支付租金，租期满后可选择留购、续租或退还。",
    partner: "工银金租 / 兴业金租 / 民生金租",
    typicalPlan: "8卡H100整机（285万元），首付10%（28.5万），36期月租约7.2万元，期满留购价1万元",
    platformRole: "场景导流 + 设备评估 + 残值担保",
    revenue: "租赁金额 1-3% 导佣",
    rate: "1-3%",
    highlights: ["零/低首付", "租期灵活", "期满留购", "残值担保"],
  },
  {
    id: "fp-002",
    name: "分期付款",
    icon: "CreditCard",
    tagline: "3/6/12/24 期灵活分期",
    description:
      "联合商业银行，为信用良好的企业买方提供设备采购分期付款服务。支持灵活分期，利率根据买方信用评级差异化定价。",
    partner: "招商银行 / 浦发银行 / 民生银行",
    typicalPlan: "设备采购款分 12 期，首付 20%，月费率 0.6%，平台担保回购",
    platformRole: "信用画像 + 担保回购",
    revenue: "分期手续费分成",
    rate: "0.5-0.8%/月",
    highlights: ["灵活分期", "信用定价", "平台担保", "设备抵押"],
  },
  {
    id: "fp-003",
    name: "以旧换新",
    icon: "Repeat",
    tagline: "旧设备抵扣新设备款",
    description:
      "买方用旧设备抵扣新设备采购款。平台对旧设备进行在线估价→上门回收→质检定价→抵扣新设备货款，形成设备全生命周期闭环。",
    partner: "平台自营",
    typicalPlan: "旧 A100 8卡抵扣 60 万，新 H100 8卡补差价 225 万",
    platformRole: "估价 + 回收 + 翻新",
    revenue: "二手流通差价",
    rate: "估价抵扣",
    highlights: ["在线估价", "上门回收", "差价抵扣", "闭环流通"],
  },
  {
    id: "fp-004",
    name: "设备抵押贷款",
    icon: "Building2",
    tagline: "存量设备变现融资",
    description:
      "企业以已拥有的算力设备作为抵押物，向合作金融机构申请贷款。平台提供设备估值、抵押登记管理和贷后资产监控服务。",
    partner: "商业银行 / 信托公司",
    typicalPlan: "8卡H100整机抵押贷款，抵押率60%，可贷171万元，年化6.5%",
    platformRole: "设备估值 + 贷后监控",
    revenue: "贷款服务费",
    rate: "抵押率 50-65%",
    highlights: ["存量变现", "抵押率50-65%", "贷后监控", "动环数据辅助"],
  },
  {
    id: "fp-005",
    name: "算力保险",
    icon: "ShieldCheck",
    tagline: "覆盖运输/故障/衰减风险",
    description:
      "联合保险公司推出算力设备保险产品，覆盖设备运输损坏、运行故障、算力衰减等风险。",
    partner: "人保财险 / 平安产险 / 太保产险",
    typicalPlan: "运输险保价0.3-0.5%；运行故障险年费2-4%；算力衰减险保障≥85%标称算力",
    platformRole: "产品设计与导流",
    revenue: "保费 10-15% 导佣",
    rate: "0.3-4%",
    highlights: ["运输险", "故障险", "延保服务", "衰减险"],
  },
  {
    id: "fp-006",
    name: "残值担保",
    icon: "TrendingUp",
    tagline: "承诺期满残值不低于约定比例",
    description:
      "平台为融资租赁和分期付款交易提供残值担保服务。承诺在租期/分期期满时，设备残值不低于约定比例，若市场残值低于约定值，平台补足差额或按约定价回购。",
    partner: "平台自营",
    typicalPlan: "承诺3年后残值≥原价30%，低于约定值平台按约定价回购",
    platformRole: "残值预测 + 差额补足",
    revenue: "担保服务费",
    rate: "担保 30-40%",
    highlights: ["残值承诺", "差额补足", "约定价回购", "数据驱动"],
  },
];

export const financePartners = [
  { type: "金租公司", names: ["工银金租", "兴业金租", "民生金租", "交银金租"] },
  { type: "商业银行", names: ["招商银行", "浦发银行", "民生银行", "平安银行"] },
  { type: "保险公司", names: ["人保财险", "平安产险", "太保产险", "国寿财险"] },
];
