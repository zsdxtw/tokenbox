import { create } from 'zustand'

export type UserRole = 'enterprise' | 'personal' | 'seller'

export interface UserInfo {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  company?: string
  avatar?: string
  address?: string
}

interface AuthStore {
  user: UserInfo | null
  isLoggedIn: boolean
  login: (user: UserInfo) => void
  logout: () => void
  updateProfile: (data: Partial<UserInfo>) => void
}

export const roleLabels: Record<UserRole, string> = {
  enterprise: '企业采购方',
  personal: '个人买家',
  seller: '寄售卖家',
}

export const roleDescriptions: Record<UserRole, string> = {
  enterprise: '批量采购、专属报价、企业发票',
  personal: '浏览采购、二手交易、个人中心',
  seller: '发布设备、寄售管理、极速回款',
}

// Mock users for demo
const mockUsers: Record<UserRole, UserInfo> = {
  enterprise: {
    id: 'user-001',
    name: '张建国',
    email: 'zhang@company.com',
    phone: '13800138001',
    role: 'enterprise',
    company: '北京智算科技有限公司',
    address: '北京市海淀区中关村软件园二期8号楼',
  },
  personal: {
    id: 'user-002',
    name: '李明',
    email: 'liming@email.com',
    phone: '13900139002',
    role: 'personal',
    address: '上海市浦东新区张江高科技园区',
  },
  seller: {
    id: 'user-003',
    name: '王矿场',
    email: 'wang@mine.com',
    phone: '13700137003',
    role: 'seller',
    company: '内蒙古云算矿场',
    address: '内蒙古鄂尔多斯市达拉特旗',
  },
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user: UserInfo) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  updateProfile: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}))

// Helper to get mock user by role (for demo login)
export function getMockUser(role: UserRole): UserInfo {
  return mockUsers[role]
}
