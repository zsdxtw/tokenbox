import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';

const hotProducts = products.filter((p) =>
  p.tags.some((t) => t.includes('旗舰') || t.includes('最新') || t.includes('高性价比'))
).slice(0, 8);

// Fallback: if filter yields too few, pad with first products
const displayProducts =
  hotProducts.length >= 4
    ? hotProducts
    : products.slice(0, 8);

export default function HotProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-nest-orange" />
          <h2 className="font-display text-2xl font-bold text-nest-text">爆款推荐</h2>
          <span className="w-1.5 h-1.5 rounded-full bg-nest-orange animate-pulse-slow" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-lg bg-nest-card border border-nest-border flex items-center justify-center text-nest-blue hover:bg-nest-surface hover:border-nest-blue transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-lg bg-nest-card border border-nest-border flex items-center justify-center text-nest-blue hover:bg-nest-surface hover:border-nest-blue transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
