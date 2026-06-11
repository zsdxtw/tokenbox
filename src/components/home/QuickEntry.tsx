import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, RefreshCw, Droplets, Zap } from 'lucide-react';
import React from 'react';

interface EntryItem {
  title: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  hoverShadow: string;
  borderColor: string;
  iconColor: string;
  route: string;
}

const entries: EntryItem[] = [
  {
    title: 'AI算力专区',
    description: 'GPU加速卡、AI服务器、矿机等核心算力设备',
    icon: Cpu,
    accent: 'border-l-nest-blue',
    hoverShadow: 'hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]',
    borderColor: 'border-l-nest-blue',
    iconColor: 'text-nest-blue',
    route: '/ai-computing',
  },
  {
    title: '二手矿机交易',
    description: '专业质检、以旧换新、极速回款',
    icon: RefreshCw,
    accent: 'border-l-nest-orange',
    hoverShadow: 'hover:shadow-[0_0_20px_rgba(255,140,0,0.3)]',
    borderColor: 'border-l-nest-orange',
    iconColor: 'text-nest-orange',
    route: '/secondhand',
  },
  {
    title: '液冷改造方案',
    description: '浸没式液冷、冷板式液冷全套解决方案',
    icon: Droplets,
    accent: 'border-l-nest-green',
    hoverShadow: 'hover:shadow-[0_0_20px_rgba(0,230,118,0.3)]',
    borderColor: 'border-l-nest-green',
    iconColor: 'text-nest-green',
    route: '/cooling',
  },
  {
    title: '电力扩容包',
    description: '变压器、UPS、PDU配电等电力基础设施',
    icon: Zap,
    accent: 'border-l-nest-yellow',
    hoverShadow: 'hover:shadow-[0_0_20px_rgba(255,214,0,0.3)]',
    borderColor: 'border-l-nest-yellow',
    iconColor: 'text-nest-yellow',
    route: '/power',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function QuickEntry() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {entries.map((entry) => {
          const Icon = entry.icon;
          return (
            <motion.div key={entry.title} variants={item}>
              <Link
                to={entry.route}
                className={`flex items-center gap-5 p-6 bg-nest-card border border-nest-border border-l-4 ${entry.borderColor} rounded-lg transition-all duration-300 hover:-translate-y-1 ${entry.hoverShadow}`}
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-lg bg-nest-surface flex items-center justify-center ${entry.iconColor}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-nest-text">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-nest-muted mt-1">{entry.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
