import { create } from 'zustand'
import { Product, products } from '../data/products'

interface ProductStore {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  selectedCondition: string;
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'default';
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedCondition: (condition: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: 'price-asc' | 'price-desc' | 'name' | 'default') => void;
  getFilteredProducts: () => Product[];
  getProductById: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products,
  searchQuery: '',
  selectedCategory: '',
  selectedCondition: '',
  priceRange: [0, Infinity],
  sortBy: 'default',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedCondition: (condition) => set({ selectedCondition: condition }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),

  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory, selectedCondition, priceRange, sortBy } = get()

    let filtered = products.filter((product) => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesDesc = product.description.toLowerCase().includes(query)
        if (!matchesName && !matchesDesc) return false
      }

      // 分类过滤
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }

      // 成色过滤
      if (selectedCondition && product.condition !== selectedCondition) {
        return false
      }

      // 价格区间过滤
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      return true
    })

    // 排序
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'default':
      default:
        break
    }

    return filtered
  },

  getProductById: (id) => {
    const { products } = get()
    return products.find((product) => product.id === id)
  },
}))
