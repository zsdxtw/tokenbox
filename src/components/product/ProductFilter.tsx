import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { categories } from '../../data/categories';

const conditionFilters = [
  { value: '', label: '全部' },
  { value: 'new', label: '全新' },
  { value: 'used-99', label: '99新' },
  { value: 'used-refurbished', label: '翻新' },
  { value: 'used-functional', label: '功能完好' },
];

const sortOptions = [
  { value: 'default', label: '默认' },
  { value: 'price-asc', label: '价格升序' },
  { value: 'price-desc', label: '价格降序' },
  { value: 'name', label: '名称' },
] as const;

export default function ProductFilter({ category }: { category: string }) {
  const { sortBy, setSortBy, selectedCondition, setSelectedCondition, getFilteredProducts } = useProductStore();
  const filtered = getFilteredProducts();
  const currentCategory = categories.find((c) => c.id === category);

  return (
    <div className="space-y-3">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-nest-muted">
          <SlidersHorizontal size={16} />
          <span>共 <span className="text-nest-text font-medium">{filtered.length}</span> 件商品</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-nest-card border border-nest-border rounded px-2 py-1 text-sm text-nest-text
              focus:outline-none focus:border-nest-blue"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="flex border border-nest-border rounded overflow-hidden">
            <button className="p-1.5 bg-nest-blue/20 text-nest-blue">
              <LayoutGrid size={16} />
            </button>
            <button className="p-1.5 bg-nest-card text-nest-muted hover:text-nest-text transition-colors">
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Subcategory chips */}
      {currentCategory && (
        <div className="flex items-center gap-2 flex-wrap">
          {currentCategory.subCategories.map((sub) => (
            <button
              key={sub.id}
              className="text-xs px-3 py-1 rounded-full border border-nest-border bg-nest-card
                text-nest-muted hover:text-nest-text hover:border-nest-blue/50 transition-colors"
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Condition filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {conditionFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedCondition(filter.value)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              selectedCondition === filter.value
                ? 'bg-nest-blue text-nest-bg border-nest-blue font-medium'
                : 'bg-nest-card text-nest-muted border-nest-border hover:text-nest-text hover:border-nest-blue/50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
