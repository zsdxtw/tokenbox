import { motion } from 'framer-motion';
import { Info, Layers, Repeat, Wrench, BarChart3 } from 'lucide-react';

const advantages = [
  { icon: Layers, title: '全品类覆盖', desc: '32条产品线，涵盖GPU服务器、矿机、电源、散热、网络等全产业链设备' },
  { icon: Repeat, title: '新旧同台', desc: '一手新品与二手设备同台交易，满足不同预算与场景需求' },
  { icon: Wrench, title: '全链路服务', desc: '从采购选型到安装调试、运维托管，提供一站式全生命周期服务' },
  { icon: BarChart3, title: '行情透明', desc: '实时算力设备行情数据，价格走势一目了然，交易更安心' },
];

const timeline = [
  { date: '2024.06', event: '公司成立' },
  { date: '2024.12', event: '平台上线' },
  { date: '2025.06', event: '突破1000家客户' },
  { date: '2025.12', event: 'GMV突破10亿' },
  { date: '2026.06', event: '八大枢纽仓布局完成' },
];

export default function About() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-blue/10 flex items-center justify-center">
          <Info className="w-5 h-5 text-nest-blue" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">关于算力巢</h1>
      </div>

      {/* 平台简介 */}
      <div className="bg-nest-card border border-nest-border rounded-lg p-6 mb-6">
        <h2 className="font-display text-lg font-semibold text-nest-text mb-3">平台简介</h2>
        <p className="text-sm text-nest-muted leading-relaxed">
          算力巢（PowerNest）是数字化算力基础设施服务平台，覆盖从电力基建到核心计算的全产业链设备交易。我们致力于为数据中心运营商、矿场主、AI训练团队提供一站式设备采购与管理服务。
        </p>
      </div>

      {/* 核心优势 */}
      <div className="mb-6">
        <h2 className="font-display text-lg font-semibold text-nest-text mb-4">核心优势</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.35 }}
              className="bg-nest-card border border-nest-border rounded-lg p-5 hover:border-nest-blue/40 transition-colors">
              <a.icon size={28} className="text-nest-blue mb-3" />
              <h3 className="font-display font-semibold text-nest-text mb-1">{a.title}</h3>
              <p className="text-xs text-nest-muted leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 发展历程 */}
      <div className="mb-6">
        <h2 className="font-display text-lg font-semibold text-nest-text mb-4">发展历程</h2>
        <div className="bg-nest-card border border-nest-border rounded-lg p-6">
          <div className="relative">
            <div className="absolute left-[60px] top-2 bottom-2 w-px bg-nest-border" />
            <div className="space-y-5">
              {timeline.map((t, i) => (
                <motion.div key={t.date} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="flex items-center gap-4">
                  <span className="font-display text-sm font-semibold text-nest-blue w-14 text-right shrink-0">{t.date}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-nest-blue shrink-0 z-10" />
                  <span className="text-sm text-nest-text">{t.event}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 团队介绍 */}
      <div className="bg-nest-card border border-nest-border rounded-lg p-6">
        <h2 className="font-display text-lg font-semibold text-nest-text mb-3">团队介绍</h2>
        <p className="text-sm text-nest-muted leading-relaxed">
          核心团队来自华为、阿里、比特大陆等企业，拥有深厚的算力产业链经验。
        </p>
      </div>
    </motion.div>
  );
}
