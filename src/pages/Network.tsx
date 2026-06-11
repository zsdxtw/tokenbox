import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, ChevronRight } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import CategorySidebar from '../components/layout/CategorySidebar';
import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';

export default function Network() {
  const { setSelectedCategory, getFilteredProducts } = useProductStore();

  useEffect(() => {
    setSelectedCategory('network');
    return () => setSelectedCategory('');
  }, [setSelectedCategory]);

  const filtered = getFilteredProducts();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-6"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-nest-muted mb-6">
        <Link to="/" className="hover:text-nest-blue transition-colors">首页</Link>
        <ChevronRight size={14} />
        <span className="text-nest-text">网络设备馆</span>
      </nav>

      {/* Page Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-blue/10 flex items-center justify-center">
          <Wifi className="w-5 h-5 text-nest-blue" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">网络设备馆</h1>
      </div>

      {/* Layout */}
      <div className="flex gap-6">
        <CategorySidebar category="network" />
        <div className="flex-1 space-y-4">
          <ProductFilter category="network" />
          <ProductGrid products={filtered} />
        </div>
      </div>
    </motion.div>
  );
}
