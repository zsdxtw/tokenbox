import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight, AlertTriangle } from 'lucide-react';
import { marketData } from '../data/marketData';
import PriceChart from '../components/market/PriceChart';
import NewsList from '../components/market/NewsList';

export default function Market() {
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
        <span className="text-nest-text">行情资讯</span>
      </nav>

      {/* Page Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-green/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-nest-green" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">行情资讯</h1>
      </div>

      {/* Price Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {marketData.map((item) => (
          <PriceChart key={item.symbol} data={item} />
        ))}
      </div>

      {/* News List */}
      <NewsList />

      {/* Disclaimer */}
      <div className="flex items-center gap-2 mt-6 p-3 bg-nest-surface border border-nest-border rounded-lg">
        <AlertTriangle size={16} className="text-nest-yellow shrink-0" />
        <p className="text-xs text-nest-muted">行情数据仅供参考，不构成投资建议</p>
      </div>
    </motion.div>
  );
}
