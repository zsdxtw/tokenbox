import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, ChevronRight, ShieldCheck, Handshake, ClipboardCheck } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import CategorySidebar from '../components/layout/CategorySidebar';
import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';

const features = [
  { icon: Handshake, label: '以旧换新', desc: '旧设备抵扣最高80%' },
  { icon: ClipboardCheck, label: '寄售服务', desc: '专业代售极速回款' },
  { icon: ShieldCheck, label: '专业质检', desc: '72小时压力测试' },
];

const conditionFilters = [
  { value: '', label: '全部' },
  { value: 'used-99', label: '99新' },
  { value: 'used-refurbished', label: '矿渣翻新' },
  { value: 'used-functional', label: '功能完好' },
];

export default function SecondHand() {
  const { setSelectedCategory, setSelectedCondition, getFilteredProducts } = useProductStore();

  useEffect(() => {
    setSelectedCategory('');
    setSelectedCondition('');
    return () => {
      setSelectedCategory('');
      setSelectedCondition('');
    };
  }, [setSelectedCategory, setSelectedCondition]);

  const filtered = getFilteredProducts().filter((p) => p.condition !== 'new');

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
        <span className="text-nest-text">二手交易区</span>
      </nav>

      {/* Page Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-orange/10 flex items-center justify-center">
          <RefreshCw className="w-5 h-5 text-nest-orange" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">二手交易区</h1>
      </div>

      {/* Feature Banner */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.label} className="bg-nest-card border border-nest-border rounded-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-nest-orange/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-nest-orange" />
              </div>
              <div>
                <p className="font-display font-semibold text-nest-text text-sm">{f.label}</p>
                <p className="text-xs text-nest-muted">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Condition Filter */}
      <div className="flex items-center gap-2 mb-6">
        {conditionFilters.map((cf) => (
          <button
            key={cf.value}
            onClick={() => setSelectedCondition(cf.value)}
            className="text-xs px-3 py-1.5 rounded-full border border-nest-border bg-nest-card text-nest-muted hover:text-nest-text hover:border-nest-orange/50 transition-colors"
          >
            {cf.label}
          </button>
        ))}
      </div>

      {/* Layout */}
      <div className="flex gap-6">
        <CategorySidebar category="" />
        <div className="flex-1 space-y-4">
          <ProductFilter category="" />
          <ProductGrid products={filtered} />
        </div>
      </div>
    </motion.div>
  );
}
