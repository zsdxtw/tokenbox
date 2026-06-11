import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import { brands } from '../data/brands';

const categoryLabels: Record<string, string> = {
  'ai-computing': 'AI算力',
  'power': '电力',
  'cooling': '散热',
  'network': '网络',
  'cabinet': '机柜',
  'tools': '工具',
};

const gradients = [
  'from-nest-blue/30 to-nest-blue-dark/30',
  'from-nest-orange/30 to-nest-orange-dark/30',
  'from-nest-green/30 to-nest-green/10',
  'from-nest-yellow/30 to-nest-yellow/10',
  'from-nest-red/30 to-nest-red/10',
  'from-purple-500/30 to-purple-700/30',
];

export default function Brands() {
  const navigate = useNavigate();

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
        <span className="text-nest-text">品牌中心</span>
      </nav>

      {/* Page Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-blue/10 flex items-center justify-center">
          <Award className="w-5 h-5 text-nest-blue" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">品牌中心</h1>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => navigate('/ai-computing')}
            className="bg-nest-card border border-nest-border rounded-lg p-5 cursor-pointer hover:border-nest-blue hover:shadow-glow-blue transition-all duration-300"
          >
            {/* Logo placeholder */}
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center mx-auto mb-3`}>
              <span className="font-display text-2xl font-bold text-nest-text">
                {brand.name.charAt(0)}
              </span>
            </div>
            <h3 className="font-display text-base font-semibold text-nest-text text-center">
              {brand.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {brand.category.map((cat) => (
                <span key={cat} className="text-[10px] px-1.5 py-0.5 rounded bg-nest-surface text-nest-muted">
                  {categoryLabels[cat] || cat}
                </span>
              ))}
            </div>
            <p className="text-xs text-nest-muted text-center mt-2">{brand.productCount} 件商品</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
