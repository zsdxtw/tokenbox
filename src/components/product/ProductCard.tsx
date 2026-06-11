import { Link } from 'react-router-dom';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
}

const conditionLabels: Record<string, string> = {
  'new': '全新',
  'used-99': '99新',
  'used-refurbished': '翻新',
  'used-functional': '良品',
};

const conditionColors: Record<string, string> = {
  'new': 'bg-nest-green/20 text-nest-green',
  'used-99': 'bg-nest-blue/20 text-nest-blue',
  'used-refurbished': 'bg-nest-orange/20 text-nest-orange',
  'used-functional': 'bg-nest-yellow/20 text-nest-yellow',
};

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) =>
    price >= 10000 ? `¥${(price / 10000).toFixed(1)}万` : `¥${price.toLocaleString()}`;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex-shrink-0 w-64 bg-nest-card border border-nest-border rounded-lg overflow-hidden transition-all duration-300 hover:border-nest-blue hover:shadow-glow-blue"
    >
      <div className="relative h-44 bg-nest-surface overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${
            conditionColors[product.condition] || 'bg-nest-muted/20 text-nest-muted'
          }`}
        >
          {conditionLabels[product.condition] || product.condition}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium bg-nest-red/20 text-nest-red">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-body text-nest-text truncate group-hover:text-nest-blue transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-nest-muted mt-1 truncate">{product.brand} · {product.subCategory}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-display font-bold text-nest-orange">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-nest-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {product.hasInspection && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-nest-green/10 text-nest-green border border-nest-green/20">
              已质检
            </span>
          )}
          <span className="text-[10px] text-nest-muted">库存 {product.stock}</span>
        </div>
      </div>
    </Link>
  );
}
