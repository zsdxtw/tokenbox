export interface SubCategory {
  id: string;
  name: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: 'ai-computing',
    name: '核心计算',
    icon: 'Cpu',
    description: 'GPU加速卡、AI服务器、矿机等核心算力设备，涵盖NVIDIA、AMD、蚂蚁矿机等主流品牌，为AI训练、推理和加密货币挖矿提供强大算力支撑。',
    subCategories: [
      { id: 'gpu-card', name: 'GPU加速卡', productCount: 4 },
      { id: 'gpu-server', name: 'GPU服务器', productCount: 2 },
      { id: 'miner', name: '矿机', productCount: 2 },
    ],
  },
  {
    id: 'power',
    name: '电力基建',
    icon: 'Zap',
    description: '变压器、UPS不间断电源、PDU配电单元、发电机组等电力基础设施，为数据中心和矿场提供稳定可靠的电力保障。',
    subCategories: [
      { id: 'transformer', name: '变压器', productCount: 1 },
      { id: 'ups', name: 'UPS不间断电源', productCount: 1 },
      { id: 'pdu', name: '配电单元', productCount: 1 },
      { id: 'generator', name: '发电机组', productCount: 1 },
    ],
  },
  {
    id: 'cooling',
    name: '散热与液冷',
    icon: 'Snowflake',
    description: '浸没式液冷、冷板式液冷、冷却液、精密空调等散热解决方案，有效降低设备温度，提升运行稳定性和能效比。',
    subCategories: [
      { id: 'immersion-cooling', name: '浸没式液冷', productCount: 1 },
      { id: 'cold-plate', name: '冷板式液冷', productCount: 1 },
      { id: 'coolant', name: '冷却液', productCount: 1 },
      { id: 'precision-ac', name: '精密空调', productCount: 1 },
    ],
  },
  {
    id: 'network',
    name: '网络互联',
    icon: 'Network',
    description: 'InfiniBand交换机、以太网交换机、光模块、智能网卡等高速网络设备，构建低延迟、高带宽的AI集群互联网络。',
    subCategories: [
      { id: 'switch', name: '交换机', productCount: 2 },
      { id: 'optical-module', name: '光模块', productCount: 1 },
      { id: 'nic', name: '网卡', productCount: 1 },
    ],
  },
  {
    id: 'cabinet',
    name: '机柜存储',
    icon: 'Server',
    description: '标准服务器机柜、高级服务器机柜等机柜产品，提供安全可靠的设备安装和线缆管理解决方案。',
    subCategories: [
      { id: 'standard-cabinet', name: '标准机柜', productCount: 1 },
      { id: 'premium-cabinet', name: '高级机柜', productCount: 1 },
    ],
  },
  {
    id: 'tools',
    name: '工具耗材',
    icon: 'Wrench',
    description: '万用表、导热硅脂等运维工具和耗材，满足算力设备日常维护和散热优化的需求。',
    subCategories: [
      { id: 'test-instrument', name: '测试仪器', productCount: 1 },
      { id: 'thermal-material', name: '导热材料', productCount: 1 },
    ],
  },
];
