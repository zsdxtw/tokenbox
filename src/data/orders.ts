export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  condition: string
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  address: string
  invoiceType: 'none' | 'personal' | 'enterprise'
  trackingNo?: string
}

export const statusLabels: Record<OrderStatus, string> = {
  pending: '待付款',
  paid: '已付款',
  shipped: '已发货',
  delivered: '已完成',
  cancelled: '已取消',
}

export const statusColors: Record<OrderStatus, string> = {
  pending: 'text-nest-orange',
  paid: 'text-nest-blue',
  shipped: 'text-nest-green',
  delivered: 'text-nest-muted',
  cancelled: 'text-nest-red',
}

export const orders: Order[] = [
  {
    id: 'ORD-20260601-001',
    userId: 'user-001',
    items: [
      {
        productId: 'prod-001',
        name: 'NVIDIA H100 80GB SXM5',
        price: 258000,
        quantity: 2,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=NVIDIA%20H100%20GPU&image_size=square',
        condition: 'new',
      },
      {
        productId: 'prod-011',
        name: 'APC PDU 0U 32A',
        price: 6800,
        quantity: 4,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=APC%20PDU&image_size=square',
        condition: 'new',
      },
    ],
    totalAmount: 543200,
    status: 'shipped',
    createdAt: '2026-06-01 14:30:00',
    address: '北京市海淀区中关村软件园二期8号楼',
    invoiceType: 'enterprise',
    trackingNo: 'SF1234567890',
  },
  {
    id: 'ORD-20260603-002',
    userId: 'user-001',
    items: [
      {
        productId: 'prod-017',
        name: 'NVIDIA Mellanox SN3700 InfiniBand交换机',
        price: 158000,
        quantity: 1,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mellanox%20switch&image_size=square',
        condition: 'new',
      },
    ],
    totalAmount: 158000,
    status: 'paid',
    createdAt: '2026-06-03 09:15:00',
    address: '北京市海淀区中关村软件园二期8号楼',
    invoiceType: 'enterprise',
  },
  {
    id: 'ORD-20260605-003',
    userId: 'user-002',
    items: [
      {
        productId: 'prod-003',
        name: 'NVIDIA RTX 4090',
        price: 16800,
        quantity: 1,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=RTX%204090&image_size=square',
        condition: 'new',
      },
    ],
    totalAmount: 16800,
    status: 'delivered',
    createdAt: '2026-05-28 16:45:00',
    address: '上海市浦东新区张江高科技园区',
    invoiceType: 'personal',
  },
  {
    id: 'ORD-20260608-004',
    userId: 'user-002',
    items: [
      {
        productId: 'prod-005',
        name: 'Antminer S19j Pro 120T',
        price: 18500,
        quantity: 3,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Antminer%20S19&image_size=square',
        condition: 'used-refurbished',
      },
    ],
    totalAmount: 55500,
    status: 'pending',
    createdAt: '2026-06-08 11:20:00',
    address: '上海市浦东新区张江高科技园区',
    invoiceType: 'none',
  },
  {
    id: 'ORD-20260610-005',
    userId: 'user-003',
    items: [
      {
        productId: 'prod-015',
        name: '3M Fluorinert FC-40冷却液',
        price: 2800,
        quantity: 10,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3M%20cooling%20liquid&image_size=square',
        condition: 'new',
      },
      {
        productId: 'prod-024',
        name: '道康宁 导热硅脂TC-5026',
        price: 168,
        quantity: 20,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=thermal%20paste&image_size=square',
        condition: 'new',
      },
    ],
    totalAmount: 31360,
    status: 'paid',
    createdAt: '2026-06-10 08:00:00',
    address: '内蒙古鄂尔多斯市达拉特旗',
    invoiceType: 'enterprise',
  },
  {
    id: 'ORD-20260520-006',
    userId: 'user-001',
    items: [
      {
        productId: 'prod-013',
        name: '绿联 浸没式液冷槽 DC-500',
        price: 128000,
        quantity: 1,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=immersion%20cooling&image_size=square',
        condition: 'new',
      },
    ],
    totalAmount: 128000,
    status: 'delivered',
    createdAt: '2026-05-20 10:30:00',
    address: '北京市海淀区中关村软件园二期8号楼',
    invoiceType: 'enterprise',
    trackingNo: 'JD9876543210',
  },
  {
    id: 'ORD-20260515-007',
    userId: 'user-003',
    items: [
      {
        productId: 'prod-021',
        name: '图腾 42U标准服务器机柜 G2',
        price: 6800,
        quantity: 5,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=server%20rack&image_size=square',
        condition: 'new',
      },
    ],
    totalAmount: 34000,
    status: 'cancelled',
    createdAt: '2026-05-15 15:00:00',
    address: '内蒙古鄂尔多斯市达拉特旗',
    invoiceType: 'enterprise',
  },
]
