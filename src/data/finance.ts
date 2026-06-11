// 金融服务数据模型

export type FinanceServiceKey = 'equipment-mortgage' | 'cluster-construction' | 'used-equipment-finance' | 'asset-disposal';

export interface FinanceService {
  id: FinanceServiceKey;
  title: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name (used in page)
  accentColor: string; // tailwind bg class
}

export interface FinanceCaseStudy {
  id: string;
  industry: string;
  industryLabel: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export interface FinancePartner {
  name: string;
  type: string;
  icon: string; // emoji placeholder
}

export interface FinanceProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string; // lucide icon name
}

// 服务颜色映射
export const serviceColorMap: Record<FinanceServiceKey, { bg: string; text: string; bar: string; glow: string }> = {
  'equipment-mortgage':       { bg: 'bg-nest-yellow/10', text: 'text-nest-yellow', bar: 'bg-nest-yellow', glow: 'shadow-[0_0_16px_rgba(255,214,0,0.25)]' },
  'cluster-construction':     { bg: 'bg-nest-blue/10',   text: 'text-nest-blue',   bar: 'bg-nest-blue',   glow: 'shadow-glow-blue' },
  'used-equipment-finance':   { bg: 'bg-nest-orange/10', text: 'text-nest-orange', bar: 'bg-nest-orange', glow: 'shadow-[0_0_16px_rgba(255,140,0,0.25)]' },
  'asset-disposal':           { bg: 'bg-[#7B61FF]/10',   text: 'text-[#7B61FF]',   bar: 'bg-[#7B61FF]',   glow: 'shadow-[0_0_16px_rgba(123,97,255,0.25)]' },
};

// ============ 四大服务 ============

export const financeServices: FinanceService[] = [
  {
    id: 'equipment-mortgage',
    title: '设备抵押融资',
    description: '以存量算力设备为抵押物，快速获取流动资金。支持GPU服务器、网络设备、存储设备等全品类抵押，审批快、利率低、额度高。',
    features: ['最高估值80%', '3个工作日审批', '年化利率3.8%起', '灵活还款方式'],
    icon: 'Landmark',
    accentColor: 'bg-nest-yellow',
  },
  {
    id: 'cluster-construction',
    title: '集群建设融资',
    description: '面向千卡/万卡集群建设需求，提供全链条融资服务。从设备采购到机房建设，一站式资金解决方案，助力算力规模快速扩张。',
    features: ['额度最高5亿', '期限最长5年', '建设期免息', '设备直采优惠'],
    icon: 'Building2',
    accentColor: 'bg-nest-blue',
  },
  {
    id: 'used-equipment-finance',
    title: '二手设备金融',
    description: '为二手算力设备交易提供专属金融产品。买方分期、卖方回租、供应链保理，全场景覆盖二手交易资金需求。',
    features: ['分期最长达36期', '首付低至10%', '残值兜底保障', '线上即时审批'],
    icon: 'RefreshCw',
    accentColor: 'bg-nest-orange',
  },
  {
    id: 'asset-disposal',
    title: '资产处置变现',
    description: '算力设备全生命周期末端处置方案。残值评估、拍卖变现、以旧换新、环保回收，一站式设备退出服务。',
    features: ['专业残值评估', '7天快速变现', '以旧换新补贴', '合规环保处置'],
    icon: 'Gavel',
    accentColor: 'bg-[#7B61FF]',
  },
];

// ============ 案例研究 ============

export const financeCaseStudies: FinanceCaseStudy[] = [
  {
    id: 'case-equipment-mortgage',
    industry: 'ai',
    industryLabel: 'AI算力',
    title: '某AI企业GPU服务器抵押融资',
    description: '为某头部AI训练企业以128台H100服务器为抵押，3个工作日完成审批，获得8000万元流动资金贷款，用于模型研发团队扩编。',
    metrics: [
      { label: '融资金额', value: '¥8,000万' },
      { label: '抵押率', value: '75%' },
      { label: '审批周期', value: '3天' },
      { label: '年化利率', value: '4.2%' },
    ],
    accentColor: 'bg-nest-yellow',
  },
  {
    id: 'case-cluster-finance',
    industry: 'cloud',
    industryLabel: '云计算',
    title: '某云服务商万卡集群建设融资',
    description: '为某区域云服务商提供2亿元集群建设融资，覆盖GPU采购、液冷系统、配电改造全链条，建设期6个月免息，助力快速投产。',
    metrics: [
      { label: '融资总额', value: '¥2亿' },
      { label: '建设期', value: '6个月免息' },
      { label: '还款期限', value: '5年' },
      { label: '设备直采折扣', value: '12%' },
    ],
    accentColor: 'bg-nest-blue',
  },
  {
    id: 'case-asset-disposal',
    industry: 'energy',
    industryLabel: '能源',
    title: '某能源企业算力资产处置',
    description: '为某能源企业处置退役的256台V100服务器集群，通过以旧换新方案置换H100设备，残值变现+补贴共计回收1,200万元。',
    metrics: [
      { label: '处置设备', value: '256台V100' },
      { label: '残值回收', value: '¥1,200万' },
      { label: '以旧换新补贴', value: '¥380万' },
      { label: '变现周期', value: '7天' },
    ],
    accentColor: 'bg-[#7B61FF]',
  },
];

// ============ 合作银行 ============

export const financePartners: FinancePartner[] = [
  { name: '工商银行', type: '国有大行', icon: '🏦' },
  { name: '建设银行', type: '国有大行', icon: '🏦' },
  { name: '招商银行', type: '股份制银行', icon: '🏦' },
  { name: '浦发银行', type: '股份制银行', icon: '🏦' },
  { name: '兴业银行', type: '股份制银行', icon: '🏦' },
  { name: '中信银行', type: '股份制银行', icon: '🏦' },
  { name: '浙商银行', type: '股份制银行', icon: '🏦' },
  { name: '网商银行', type: '互联网银行', icon: '🏦' },
];

// ============ 业务流程步骤 ============

export const financeProcessSteps: FinanceProcessStep[] = [
  { step: 1, title: '需求咨询', description: '提交融资/处置需求，专属顾问1对1对接', icon: 'Phone' },
  { step: 2, title: '方案定制', description: '根据设备类型与业务场景，定制最优金融方案', icon: 'Calculator' },
  { step: 3, title: '尽职调查', description: '设备评估、信用审核、合规尽调同步推进', icon: 'FileCheck' },
  { step: 4, title: '签约放款', description: '线上签约、资金最快T+0到账', icon: 'Banknote' },
  { step: 5, title: '持续管理', description: '贷后设备监控、残值动态评估、到期灵活处置', icon: 'ShieldCheck' },
];
