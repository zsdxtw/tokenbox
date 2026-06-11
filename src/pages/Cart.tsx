import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const conditionLabels: Record<string, string> = {
  'new': '全新',
  'used-99': '99新',
  'used-refurbished': '翻新',
  'used-functional': '良品',
};

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 py-20 text-center"
      >
        <ShoppingBag size={64} className="mx-auto text-nest-muted/30 mb-4" />
        <p className="text-xl text-nest-muted font-display mb-4">购物车是空的</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 rounded-lg bg-gradient-to-r from-nest-blue to-nest-blue-dark text-nest-bg font-display font-semibold hover:shadow-glow-blue transition-shadow"
        >
          继续逛逛
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-6"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-blue/10 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-nest-blue" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">购物车</h1>
        <span className="text-sm text-nest-muted">({items.length} 件商品)</span>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.productId}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-4 bg-nest-card border border-nest-border rounded-lg p-4"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-lg bg-nest-surface overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-nest-text truncate">{item.name}</p>
                <p className="text-xs text-nest-muted mt-0.5">{conditionLabels[item.condition] || item.condition}</p>
              </div>

              {/* Price */}
              <span className="text-sm font-display font-semibold text-nest-orange shrink-0">
                ¥{item.price.toLocaleString()}
              </span>

              {/* Quantity */}
              <div className="flex items-center border border-nest-border rounded shrink-0">
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-nest-muted hover:text-nest-text">
                  <Minus size={12} />
                </button>
                <span className="w-8 h-7 flex items-center justify-center text-nest-text text-sm font-display">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-nest-muted hover:text-nest-text">
                  <Plus size={12} />
                </button>
              </div>

              {/* Subtotal */}
              <span className="text-sm font-display font-bold text-nest-text shrink-0 w-24 text-right">
                ¥{(item.price * item.quantity).toLocaleString()}
              </span>

              {/* Remove */}
              <button onClick={() => removeItem(item.productId)} className="text-nest-muted hover:text-nest-red transition-colors shrink-0">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between bg-nest-card border border-nest-border rounded-lg p-4">
        <Link to="/" className="text-sm text-nest-blue hover:underline">继续购物</Link>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-sm text-nest-muted">合计：</span>
            <span className="font-display text-2xl font-bold text-nest-orange ml-2">¥{total.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="px-8 py-3 rounded-lg bg-gradient-to-r from-nest-orange to-nest-orange-dark text-white font-display font-semibold hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] transition-shadow inline-block">
            去结算
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
