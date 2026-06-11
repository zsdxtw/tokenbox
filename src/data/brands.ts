export interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string[];
  productCount: number;
}

const imgBase = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=';

export const brands: Brand[] = [
  {
    id: 'brand-nvidia',
    name: 'NVIDIA',
    logo: `${imgBase}${encodeURIComponent('NVIDIA logo, green text on white background, official brand logo, clean minimal design')}&image_size=square`,
    category: ['ai-computing', 'network'],
    productCount: 4,
  },
  {
    id: 'brand-amd',
    name: 'AMD',
    logo: `${imgBase}${encodeURIComponent('AMD logo, red text on white background, official brand logo, clean minimal design')}&image_size=square`,
    category: ['ai-computing'],
    productCount: 1,
  },
  {
    id: 'brand-intel',
    name: 'Intel',
    logo: `${imgBase}${encodeURIComponent('Intel logo, blue text on white background, official brand logo, clean minimal design')}&image_size=square`,
    category: ['ai-computing'],
    productCount: 0,
  },
  {
    id: 'brand-bitmain',
    name: '蚂蚁矿机(Bitmain)',
    logo: `${imgBase}${encodeURIComponent('Bitmain Antminer logo, brand logo on white background, clean minimal design')}&image_size=square`,
    category: ['ai-computing'],
    productCount: 2,
  },
  {
    id: 'brand-inspur',
    name: '浪潮',
    logo: `${imgBase}${encodeURIComponent('Inspur logo, Chinese technology company brand logo on white background, clean minimal design')}&image_size=square`,
    category: ['ai-computing'],
    productCount: 1,
  },
  {
    id: 'brand-dell',
    name: '戴尔',
    logo: `${imgBase}${encodeURIComponent('Dell logo, blue text on white background, official brand logo, clean minimal design')}&image_size=square`,
    category: ['ai-computing'],
    productCount: 1,
  },
  {
    id: 'brand-huawei',
    name: '华为',
    logo: `${imgBase}${encodeURIComponent('Huawei logo, red petal symbol on white background, official brand logo, clean minimal design')}&image_size=square`,
    category: ['network'],
    productCount: 1,
  },
  {
    id: 'brand-schneider',
    name: '施耐德',
    logo: `${imgBase}${encodeURIComponent('Schneider Electric logo, green text on white background, official brand logo, clean minimal design')}&image_size=square`,
    category: ['power'],
    productCount: 3,
  },
  {
    id: 'brand-vertiv',
    name: '维谛',
    logo: `${imgBase}${encodeURIComponent('Vertiv logo, brand logo on white background, clean minimal design')}&image_size=square`,
    category: ['cooling'],
    productCount: 1,
  },
  {
    id: 'brand-ugreen',
    name: '绿联',
    logo: `${imgBase}${encodeURIComponent('UGREEN logo, green text on white background, brand logo, clean minimal design')}&image_size=square`,
    category: ['cooling'],
    productCount: 1,
  },
  {
    id: 'brand-toten',
    name: '图腾',
    logo: `${imgBase}${encodeURIComponent('Toten cabinet brand logo on white background, clean minimal design')}&image_size=square`,
    category: ['cabinet'],
    productCount: 1,
  },
  {
    id: 'brand-3m',
    name: '3M',
    logo: `${imgBase}${encodeURIComponent('3M logo, red text on white background, official brand logo, clean minimal design')}&image_size=square`,
    category: ['cooling'],
    productCount: 1,
  },
  {
    id: 'brand-mellanox',
    name: 'Mellanox',
    logo: `${imgBase}${encodeURIComponent('Mellanox NVIDIA networking logo, blue text on white background, brand logo, clean minimal design')}&image_size=square`,
    category: ['network'],
    productCount: 2,
  },
  {
    id: 'brand-uni-t',
    name: '优利德',
    logo: `${imgBase}${encodeURIComponent('UNI-T logo, yellow and red text on white background, brand logo, clean minimal design')}&image_size=square`,
    category: ['tools'],
    productCount: 1,
  },
];
