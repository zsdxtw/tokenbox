// 解决方案数据模型

export type ChainLink = 'power' | 'transfer' | 'cooling' | 'compute' | 'cluster';
export type Industry = 'all' | 'ai-training' | 'cloud-datacenter' | 'edge-computing' | 'scientific-computing' | 'smart-city';

export interface SolutionParam {
  label: string;
  highlight?: boolean;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  chains: ChainLink[];
  params: SolutionParam[];
  accentColor: string;       // Tailwind class for the top bar color
  industry: Industry[];
  // 方案详情（千卡AI训练集群的完整示例）
  detail?: {
    subtitle: string;
    archLayers: {
      label: string;
      icon: string;
      color: string;
      items: string;
    }[];
    configTable: {
      deviceName: string;
      model: string;
      qty: string;
    }[];
  };
}

export interface CaseStudy {
  id: string;
  industry: 'ai' | 'cloud' | 'energy';
  industryLabel: string;
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  accentColor: string;
}

// 链路环节颜色映射
export const chainColorMap: Record<ChainLink, { bg: string; text: string; dot: string; bar: string }> = {
  power:    { bg: 'bg-nest-yellow/10',  text: 'text-nest-yellow',  dot: 'bg-nest-yellow',  bar: 'bg-nest-yellow' },
  transfer: { bg: 'bg-nest-blue/10',    text: 'text-nest-blue',    dot: 'bg-nest-blue',    bar: 'bg-nest-blue' },
  cooling:  { bg: 'bg-nest-green/10',   text: 'text-nest-green',   dot: 'bg-nest-green',   bar: 'bg-nest-green' },
  compute:  { bg: 'bg-[#7B61FF]/10',    text: 'text-[#7B61FF]',    dot: 'bg-[#7B61FF]',    bar: 'bg-[#7B61FF]' },
  cluster:  { bg: 'bg-nest-blue/10',    text: 'text-nest-blue',    dot: 'bg-nest-blue',    bar: 'bg-nest-blue' },
};

export const chainLabels: Record<ChainLink, string> = {
  power: '电力',
  transfer: '传输',
  cooling: '冷却',
  compute: '算力',
  cluster: '集群',
};

export const industryOptions: { value: Industry; label: string }[] = [
  { value: 'all', label: '全部行业' },
  { value: 'ai-training', label: 'AI训练中心' },
  { value: 'cloud-datacenter', label: '云计算数据中心' },
  { value: 'edge-computing', label: '边缘计算' },
  { value: 'scientific-computing', label: '科研计算' },
  { value: 'smart-city', label: '智慧城市' },
];

export const chainOptions: { value: ChainLink | 'all'; label: string; dot?: string }[] = [
  { value: 'all', label: '全部环节' },
  { value: 'power', label: '电力方案', dot: 'bg-nest-yellow' },
  { value: 'transfer', label: '传输方案', dot: 'bg-nest-blue' },
  { value: 'cooling', label: '冷却方案', dot: 'bg-nest-green' },
  { value: 'compute', label: '算力方案', dot: 'bg-[#7B61FF]' },
  { value: 'cluster', label: '全链路集成', dot: 'bg-nest-blue' },
];

// ============ 数据 ============

export const solutions: Solution[] = [
  {
    id: 'thousand-gpu-ai-cluster',
    title: '千卡AI训练集群方案',
    description: '面向大模型训练场景，提供从电力接入到GPU集群的全链路配置，支持千卡规模并行训练，PUE优化至1.15以下。',
    chains: ['power', 'transfer', 'cooling', 'compute'],
    params: [
      { label: '1,000+ GPU', highlight: true },
      { label: 'PUE < 1.15' },
      { label: '10MW+' },
      { label: '400G RoCE' },
    ],
    accentColor: 'bg-nest-blue',
    industry: ['ai-training'],
    detail: {
      subtitle: '面向大模型训练场景的全链路集成方案，覆盖电力接入、高速网络、液冷散热和GPU集群四大核心环节',
      archLayers: [
        { label: '电力接入层', icon: '⚡', color: '#FFB020', items: '10kV高压 → 变压器 → ATS → UPS → 智能PDU' },
        { label: '传输网络层', icon: '🔌', color: '#00B4D8', items: 'Spine-Leaf → 400G RoCE → InfiniBand' },
        { label: '冷却散热层', icon: '❄️', color: '#48BFE6', items: '冷板式液冷 → CDU → 冷却塔 → 监控' },
        { label: '算力集群层', icon: '💻', color: '#7B61FF', items: 'GPU Server × 128 → 管理/存储节点' },
      ],
      configTable: [
        { deviceName: 'GPU服务器', model: 'NVIDIA DGX H100', qty: '16台' },
        { deviceName: '管理交换机', model: 'H3C S9820-32H', qty: '2台' },
        { deviceName: '计算交换机', model: 'NVIDIA SN5600', qty: '4台' },
        { deviceName: 'UPS', model: 'Vertiv Liebert EXL S1', qty: '2台' },
        { deviceName: '液冷CDU', model: '维谛 XDU1350', qty: '8台' },
        { deviceName: '智能PDU', model: 'APC AP8886', qty: '32台' },
        { deviceName: '管理节点', model: '浪潮 NF5280M7', qty: '4台' },
        { deviceName: '存储节点', model: 'Dell ME7024', qty: '2台' },
      ],
    },
  },
  {
    id: 'liquid-cooling-datacenter',
    title: '高密度液冷数据中心方案',
    description: '冷板式+浸没式双模液冷架构，单机柜功率密度可达100kW，适用于超高算力密度场景，大幅降低散热能耗。',
    chains: ['power', 'cooling', 'compute'],
    params: [
      { label: '100kW/柜', highlight: true },
      { label: 'PUE < 1.08' },
      { label: '节电40%+' },
    ],
    accentColor: 'bg-nest-green',
    industry: ['cloud-datacenter'],
  },
  {
    id: 'edge-computing-node',
    title: '边缘计算节点方案',
    description: '面向低延迟推理和IoT场景的紧凑型边缘节点，集成小型UPS、边缘交换机、微冷模块和推理服务器。',
    chains: ['power', 'transfer', 'cooling', 'compute'],
    params: [
      { label: '< 5ms 延迟', highlight: true },
      { label: '2-8 GPU' },
      { label: '5kW/柜' },
    ],
    accentColor: 'bg-nest-blue',
    industry: ['edge-computing'],
  },
  {
    id: 'hpc-scientific-cluster',
    title: '科研超算集群方案',
    description: '面向高校和科研院所的HPC+AI混合算力集群，兼顾传统科学计算与AI训练需求，提供灵活的CPU/GPU配比。',
    chains: ['transfer', 'cooling', 'compute'],
    params: [
      { label: '500+ TFLOPS', highlight: true },
      { label: 'CPU/GPU 混合' },
      { label: 'InfiniBand' },
    ],
    accentColor: 'bg-[#7B61FF]',
    industry: ['scientific-computing'],
  },
  {
    id: 'smart-city-infra',
    title: '智慧城市算力底座方案',
    description: '城市级AI算力基础设施方案，涵盖城市大脑推理集群、视频分析边缘节点和多云接入网关，支撑智慧城市全场景。',
    chains: ['power', 'transfer', 'cooling', 'compute', 'cluster'],
    params: [
      { label: '200+ PFLOPS', highlight: true },
      { label: '多级架构' },
      { label: '99.99% SLA' },
    ],
    accentColor: 'bg-nest-blue',
    industry: ['smart-city'],
  },
  {
    id: 'green-high-reliability-power',
    title: '绿色高可靠供电方案',
    description: '面向大型算力中心的10kV/35kV高压配电方案，集成UPS、柴发备用电源和智能PDU，供电可用性达99.999%。',
    chains: ['power'],
    params: [
      { label: '99.999%', highlight: true },
      { label: '2N 冗余' },
      { label: '智能PDU' },
    ],
    accentColor: 'bg-nest-yellow',
    industry: ['cloud-datacenter'],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-provincial-ai-center',
    industry: 'ai',
    industryLabel: 'AI训练',
    title: '某省级智算中心千卡集群建设',
    description: '为省级人工智能公共算力平台建设1024卡H100训练集群，从配电到液冷全链路交付，项目周期90天。',
    metrics: [
      { label: '集群规模', value: '1,024 GPU' },
      { label: 'PUE', value: '1.12' },
      { label: '交付周期', value: '90天' },
      { label: '投资规模', value: '¥1.2亿' },
    ],
    accentColor: 'bg-[#7B61FF]',
  },
  {
    id: 'case-liquid-cooling-retrofit',
    industry: 'cloud',
    industryLabel: '云计算',
    title: '某云服务商液冷数据中心改造',
    description: '将传统风冷数据中心改造为冷板式液冷架构，单机柜功率密度从15kW提升至80kW，年节电超200万度。',
    metrics: [
      { label: '功率密度', value: '80kW/柜' },
      { label: '年节电', value: '200万度' },
      { label: '改造周期', value: '45天' },
      { label: 'PUE降低', value: '0.32' },
    ],
    accentColor: 'bg-nest-green',
  },
  {
    id: 'case-power-system',
    industry: 'energy',
    industryLabel: '电力',
    title: '某算力中心高可靠供电系统',
    description: '为8MW算力中心设计2N冗余供电架构，集成10kV双路市电+柴发+模块化UPS，供电可用性达99.999%。',
    metrics: [
      { label: '供电容量', value: '8MW' },
      { label: '可用性', value: '99.999%' },
      { label: '冗余架构', value: '2N' },
      { label: '切换时间', value: '< 10ms' },
    ],
    accentColor: 'bg-nest-yellow',
  },
];
