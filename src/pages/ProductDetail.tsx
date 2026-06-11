import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Minus, Plus, ShoppingCart, Zap, ShieldCheck } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import InspectionReport from '../components/product/InspectionReport';
import ProductCard from '../components/product/ProductCard';

const conditionLabels: Record<string, { label: string; color: string }> = {
  'new': { label: '全新', color: 'bg-nest-green/20 text-nest-green' },
  'used-99': { label: '99新', color: 'bg-nest-blue/20 text-nest-blue' },
  'used-refurbished': { label: '翻新', color: 'bg-nest-orange/20 text-nest-orange' },
  'used-functional': { label: '良品', color: 'bg-nest-yellow/20 text-nest-yellow' },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getProductById = useProductStore((s) => s.getProductById);
  const products = useProductStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-nest-muted font-display">商品不存在</p>
        <Link to="/" className="text-nest-blue hover:underline mt-4 inline-block">返回首页</Link>
      </div>
    );
  }

  const cond = conditionLabels[product.condition] || { label: product.condition, color: 'bg-nest-muted/20 text-nest-muted' };
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.images[0],
      condition: product.condition,
    });
  };

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
        <Link to={`/${product.category}`} className="hover:text-nest-blue transition-colors">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-nest-text truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Main */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-nest-surface border border-nest-border rounded-lg overflow-hidden aspect-square">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-nest-text">{product.name}</h1>
            <span className={`text-xs px-2 py-0.5 rounded ${cond.color}`}>{cond.label}</span>
          </div>
          <p className="text-sm text-nest-muted">{product.brand} · {product.subCategory}</p>

          {/* Price */}
          <div className="bg-nest-surface border border-nest-border rounded-lg p-4">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-nest-orange">¥{product.price.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-nest-muted line-through">¥{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-nest-muted">数量</span>
            <div className="flex items-center border border-nest-border rounded">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center text-nest-muted hover:text-nest-text"><Minus size={14} /></button>
              <span className="w-10 h-8 flex items-center justify-center text-nest-text font-display">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center text-nest-muted hover:text-nest-text"><Plus size={14} /></button>
            </div>
            <span className="text-xs text-nest-muted">库存 {product.stock}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={handleAddCart} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-nest-blue to-nest-blue-dark text-nest-bg font-display font-semibold hover:shadow-glow-blue transition-shadow">
              <ShoppingCart size={18} /> 加入购物车
            </button>
            <button onClick={() => { handleAddCart(); navigate('/checkout'); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-nest-orange text-nest-orange font-display font-semibold hover:bg-nest-orange/10 transition-colors">
              <Zap size={18} /> 立即购买
            </button>
          </div>
        </div>
      </div>

      {/* Specs Table */}
      <div className="mb-8">
        <h2 className="font-display text-lg font-bold text-nest-text mb-4">规格参数</h2>
        <div className="bg-nest-card border border-nest-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-2">
            {Object.entries(product.specs).map(([key, val], i) => (
              <div key={key} className={`flex px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-nest-card' : 'bg-nest-surface/50'} border-b border-nest-border`}>
                <span className="w-28 shrink-0 text-nest-muted">{key}</span>
                <span className="text-nest-text">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspection Report */}
      {product.hasInspection && product.inspectionReport && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-nest-green" />
            <h2 className="font-display text-lg font-bold text-nest-text">质检报告</h2>
          </div>
          <InspectionReport report={product.inspectionReport} />
        </div>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-bold text-nest-text mb-4">相关推荐</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
