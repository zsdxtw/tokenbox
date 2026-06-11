import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Droplets, Wifi, Server, Wrench, type LucideIcon } from 'lucide-react';
import { categories, Category } from '../../data/categories';

const iconMap: Record<string, LucideIcon> = {
  'ai-computing': Cpu,
  'power': Zap,
  'cooling': Droplets,
  'network': Wifi,
  'cabinet': Server,
  'tools': Wrench,
};

const accentMap: Record<string, string> = {
  'ai-computing': 'text-nest-blue',
  'power': 'text-nest-yellow',
  'cooling': 'text-nest-green',
  'network': 'text-nest-blue',
  'cabinet': 'text-nest-orange',
  'tools': 'text-nest-muted',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.id] || Cpu;
  const accent = accentMap[category.id] || 'text-nest-blue';
  const totalProducts = category.subCategories.reduce((s, sc) => s + sc.productCount, 0);

  return (
    <motion.div variants={item}>
      <Link
        to={`/${category.id}`}
        className="block p-6 bg-nest-card border border-nest-border rounded-lg transition-all duration-300 hover:border-nest-blue hover:shadow-glow-blue group"
      >
        <div className={`w-14 h-14 rounded-full bg-nest-surface flex items-center justify-center mx-auto ${accent} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-nest-text text-center">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-nest-muted text-center">{totalProducts} 件商品</p>
        <p className="mt-2 text-sm text-nest-muted text-center line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </Link>
    </motion.div>
  );
}

export default function CategoryGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Cpu className="w-6 h-6 text-nest-blue" />
        <h2 className="font-display text-2xl font-bold text-nest-text">全品类覆盖</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </motion.div>
    </section>
  );
}
