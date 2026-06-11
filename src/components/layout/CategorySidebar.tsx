import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/categories';

interface CategorySidebarProps {
  category: string;
  onFilterChange?: (filters: Record<string, string>) => void;
}

interface FilterGroup {
  key: string;
  label: string;
  options: string[];
}

const filterGroups: FilterGroup[] = [
  {
    key: 'brand',
    label: '品牌',
    options: ['NVIDIA', 'AMD', '蚂蚁矿机', '神马矿机', '华为', '中兴', 'APC', '维谛'],
  },
  {
    key: 'condition',
    label: '成色',
    options: ['全新', '99成新', '95成新', '9成新', '8成新'],
  },
  {
    key: 'price',
    label: '价格区间',
    options: ['¥0-5,000', '¥5,000-20,000', '¥20,000-50,000', '¥50,000-100,000', '¥100,000+'],
  },
];

export default function CategorySidebar({ category, onFilterChange }: CategorySidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    brand: true,
    condition: true,
    price: true,
  });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const categoryData = categories.find((c) => c.id === category);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterClick = (groupKey: string, option: string) => {
    const next = { ...activeFilters };
    if (next[groupKey] === option) {
      delete next[groupKey];
    } else {
      next[groupKey] = option;
    }
    setActiveFilters(next);
    onFilterChange?.(next);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4">
      {/* Subcategories */}
      {categoryData && (
        <div className="bg-nest-card border border-nest-border rounded-lg p-4">
          <h3 className="font-display text-sm font-semibold text-nest-text mb-3">
            {categoryData.name}
          </h3>
          <ul className="space-y-1">
            {categoryData.subCategories.map((sub) => (
              <li key={sub.id}>
                <button
                  onClick={() => handleFilterClick('subcategory', sub.name)}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                    activeFilters.subcategory === sub.name
                      ? 'text-nest-blue bg-nest-blue/10'
                      : 'text-nest-muted hover:text-nest-text hover:bg-nest-surface'
                  }`}
                >
                  {sub.name}
                  <span className="float-right text-xs text-nest-muted">
                    {sub.productCount}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <div key={group.key} className="bg-nest-card border border-nest-border rounded-lg p-4">
          <button
            onClick={() => toggleGroup(group.key)}
            className="w-full flex items-center justify-between text-sm font-semibold text-nest-text"
          >
            {group.label}
            <ChevronDown
              size={16}
              className={`text-nest-muted transition-transform ${
                openGroups[group.key] ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {openGroups[group.key] && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-2 space-y-1"
              >
                {group.options.map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleFilterClick(group.key, option)}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                        activeFilters[group.key] === option
                          ? 'text-nest-blue bg-nest-blue/10'
                          : 'text-nest-muted hover:text-nest-text hover:bg-nest-surface'
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </aside>
  );
}
