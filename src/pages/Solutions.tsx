import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Phone, FileDown } from 'lucide-react';
import {
  solutions,
  caseStudies,
  chainColorMap,
  chainLabels,
  industryOptions,
  chainOptions,
  type Industry,
  type ChainLink,
  type Solution,
} from '@/data/solutions';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ============ Hero ============
function SolutionsHero() {
  const chainColors = ['#FFB020', '#00B4D8', '#48BFE6', '#7B61FF', '#00D4FF'];

  return (
    <section className="relative overflow-hidden py-20 px-4 bg-nest-bg">
      {/* 径向光晕 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          行业<span className="text-nest-blue">解决方案</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-nest-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8"
        >
          从电力到算力，为不同行业场景提供全链路设备配置方案。覆盖AI训练、云计算、边缘计算、科研计算等核心场景。
        </motion.p>

        {/* 链路装饰条 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-1 max-w-md mx-auto"
        >
          {chainColors.map((color, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className="h-[3px] flex-1 rounded-full" style={{ background: color }} />
              {i < chainColors.length - 1 && (
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: `5px solid ${chainColors[i + 1]}`,
                    borderTop: '3px solid transparent',
                    borderBottom: '3px solid transparent',
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============ 筛选器 ============
function SolutionsFilter({
  selectedIndustry,
  setSelectedIndustry,
  selectedChain,
  setSelectedChain,
}: {
  selectedIndustry: Industry;
  setSelectedIndustry: (v: Industry) => void;
  selectedChain: ChainLink | 'all';
  setSelectedChain: (v: ChainLink | 'all') => void;
}) {
  return (
    <section className="sticky top-16 z-30 bg-nest-surface/90 backdrop-blur-md border-b border-nest-border px-4 py-4">
      <div className="max-w-6xl mx-auto space-y-3">
        {/* 行业场景 */}
        <div className="flex items-start gap-3">
          <span className="text-xs font-medium text-nest-muted uppercase tracking-wider w-20 pt-1.5 shrink-0">
            行业场景
          </span>
          <div className="flex flex-wrap gap-2">
            {industryOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedIndustry(opt.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-all duration-200 ${
                  selectedIndustry === opt.value
                    ? 'text-nest-text border-nest-blue bg-nest-blue/10'
                    : 'text-nest-muted border-nest-border hover:text-nest-text hover:border-nest-blue/50 hover:bg-nest-surface/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 链路环节 */}
        <div className="flex items-start gap-3">
          <span className="text-xs font-medium text-nest-muted uppercase tracking-wider w-20 pt-1.5 shrink-0">
            链路环节
          </span>
          <div className="flex flex-wrap gap-2">
            {chainOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedChain(opt.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border transition-all duration-200 ${
                  selectedChain === opt.value
                    ? 'text-nest-text border-nest-blue bg-nest-blue/10'
                    : 'text-nest-muted border-nest-border hover:text-nest-text hover:border-nest-blue/50 hover:bg-nest-surface/50'
                }`}
              >
                {opt.dot && <span className={`w-1.5 h-1.5 rounded-full ${opt.dot}`} />}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ 方案卡片 ============
function SolutionCard({ solution, isExpanded, onToggle }: { solution: Solution; isExpanded: boolean; onToggle: () => void }) {
  const colors = chainColorMap;

  return (
    <motion.div variants={item} layout>
      <div
        className="bg-nest-card border border-nest-border rounded-lg overflow-hidden transition-all duration-300 hover:border-nest-blue/50 hover:-translate-y-0.5 hover:shadow-glow-blue/20"
      >
        {/* 顶部链路色条 */}
        <div className={`h-[3px] w-full ${solution.accentColor}`} />

        <div className="p-6">
          <h3 className="font-display text-lg font-semibold text-nest-text mb-2 leading-snug">
            {solution.title}
          </h3>
          <p className="text-sm text-nest-muted leading-relaxed mb-4 line-clamp-3">
            {solution.description}
          </p>

          {/* 参数标签 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {solution.params.map((p) => (
              <span
                key={p.label}
                className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium rounded border ${
                  p.highlight
                    ? 'text-nest-blue border-nest-blue/30 bg-nest-blue/10'
                    : 'text-nest-muted border-nest-border bg-nest-surface'
                }`}
              >
                {p.label}
              </span>
            ))}
          </div>

          {/* 链路标签 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {solution.chains.map((chain) => {
              const cm = colors[chain];
              return (
                <span
                  key={chain}
                  className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${cm.bg} ${cm.text}`}
                >
                  {chainLabels[chain]}
                </span>
              );
            })}
          </div>

          {/* 操作链接 */}
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1 text-sm font-medium text-nest-blue hover:gap-2 transition-all duration-200"
          >
            {isExpanded ? '收起详情' : '查看详情'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============ 方案详情 ============
function SolutionDetail({ solution }: { solution: Solution }) {
  if (!solution.detail) {
    return (
      <div className="mt-6 p-6 bg-nest-card border border-nest-border rounded-lg">
        <p className="text-sm text-nest-muted">更多详情即将上线，敬请期待。</p>
        <div className="flex gap-3 mt-4">
          <Link to="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-nest-orange text-white rounded-md hover:bg-nest-orange-dark transition-colors">
            <Phone className="w-3.5 h-3.5" />
            联系方案顾问
          </Link>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-nest-border text-nest-text rounded-md hover:bg-nest-surface transition-colors">
            <FileDown className="w-3.5 h-3.5" />
            下载方案PDF
          </button>
        </div>
      </div>
    );
  }

  const { detail } = solution;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      <div className="mt-6 space-y-4">
        {/* 标题行 */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-nest-text">{solution.title} — 方案详情</h2>
            <p className="text-sm text-nest-muted mt-1 max-w-lg">{detail.subtitle}</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            {solution.chains.map((chain) => {
              const cm = chainColorMap[chain];
              return (
                <span key={chain} className={`text-xs font-medium px-2 py-0.5 rounded ${cm.bg} ${cm.text}`}>
                  {chainLabels[chain]}
                </span>
              );
            })}
          </div>
        </div>

        {/* 双栏：架构图 + 配置清单 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 架构图面板 */}
          <div className="bg-nest-card border border-nest-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-nest-muted mb-4">方案架构</h3>
            <div className="space-y-3">
              {detail.archLayers.map((layer, idx) => (
                <div key={idx}>
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg border"
                    style={{
                      background: `${layer.color}08`,
                      borderColor: `${layer.color}40`,
                    }}
                  >
                    <span className="text-lg">{layer.icon}</span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: layer.color }}>
                      {layer.label}
                    </span>
                    <span className="text-xs font-mono text-nest-muted">{layer.items}</span>
                  </div>
                  {idx < detail.archLayers.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="w-px h-4 border-l border-dashed border-nest-border" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 配置清单面板 */}
          <div className="bg-nest-card border border-nest-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-nest-muted mb-4">典型配置清单（128卡方案）</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-nest-border">
                  <th className="text-left py-2 px-2 text-xs font-medium text-nest-muted uppercase tracking-wider">设备名称</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-nest-muted uppercase tracking-wider">型号</th>
                  <th className="text-right py-2 px-2 text-xs font-medium text-nest-muted uppercase tracking-wider">数量</th>
                </tr>
              </thead>
              <tbody>
                {detail.configTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-nest-border/50 last:border-b-0">
                    <td className="py-2 px-2 text-sm text-nest-text">{row.deviceName}</td>
                    <td className="py-2 px-2 text-sm font-mono font-medium text-nest-muted">{row.model}</td>
                    <td className="py-2 px-2 text-sm font-mono text-right text-nest-muted">{row.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CTA 按钮 */}
            <div className="flex gap-3 mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-nest-orange text-white rounded-md hover:bg-nest-orange-dark transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                获取报价
              </Link>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-nest-border text-nest-text rounded-md hover:bg-nest-surface transition-colors">
                <FileDown className="w-3.5 h-3.5" />
                下载方案PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ 客户案例 ============
function CasesSection() {
  const industryStyles: Record<string, { bg: string; text: string }> = {
    ai: { bg: 'bg-[#7B61FF]/10', text: 'text-[#7B61FF]' },
    cloud: { bg: 'bg-nest-green/10', text: 'text-nest-green' },
    energy: { bg: 'bg-nest-yellow/10', text: 'text-nest-yellow' },
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="font-display text-2xl font-bold text-nest-text mb-8">客户案例</h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {caseStudies.map((cs) => {
          const style = industryStyles[cs.industry] || industryStyles.ai;
          return (
            <motion.div key={cs.id} variants={item}>
              <div className="bg-nest-card border border-nest-border rounded-lg overflow-hidden relative">
                {/* 顶部色条 */}
                <div className={`h-[3px] w-full ${cs.accentColor}`} />
                <div className="p-6">
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-3 ${style.bg} ${style.text}`}>
                    {cs.industryLabel}
                  </span>
                  <h3 className="font-display text-base font-semibold text-nest-text mb-2 leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-nest-muted leading-relaxed mb-4 line-clamp-3">
                    {cs.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 bg-nest-surface rounded">
                        <div className="text-xs text-nest-muted mb-0.5">{m.label}</div>
                        <div className="font-mono text-base font-semibold text-nest-text">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// ============ 底部 CTA ============
function CtaSection() {
  return (
    <section className="py-20 px-4 bg-nest-surface border-t border-nest-border text-center">
      <div className="max-w-lg mx-auto">
        <h2 className="font-display text-2xl font-bold text-nest-text mb-2">没有找到合适的方案？</h2>
        <p className="text-sm text-nest-muted mb-8">
          我们的方案团队可以根据您的具体需求，量身定制全链路设备配置方案。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-nest-orange text-white rounded-md hover:bg-nest-orange-dark transition-colors"
          >
            提交定制需求
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-nest-border text-nest-text rounded-md hover:bg-nest-card transition-colors"
          >
            联系方案顾问
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============ 主页面 ============
export default function Solutions() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('all');
  const [selectedChain, setSelectedChain] = useState<ChainLink | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSolutions = useMemo(() => {
    return solutions.filter((s) => {
      const industryMatch =
        selectedIndustry === 'all' || s.industry.includes(selectedIndustry);
      const chainMatch =
        selectedChain === 'all' || s.chains.includes(selectedChain);
      return industryMatch && chainMatch;
    });
  }, [selectedIndustry, selectedChain]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const expandedSolution = solutions.find((s) => s.id === expandedId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* 面包屑 */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <nav className="flex items-center gap-1.5 text-sm text-nest-muted">
          <Link to="/" className="hover:text-nest-blue transition-colors">首页</Link>
          <ChevronRight size={14} />
          <span className="text-nest-text">解决方案</span>
        </nav>
      </div>

      <SolutionsHero />
      <SolutionsFilter
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedChain={selectedChain}
        setSelectedChain={setSelectedChain}
      />

      {/* 方案卡片网格 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-xs font-medium uppercase tracking-wider text-nest-muted mb-6">
          推荐方案 · {filteredSolutions.length} 项
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredSolutions.map((s) => (
            <SolutionCard
              key={s.id}
              solution={s}
              isExpanded={expandedId === s.id}
              onToggle={() => toggleExpand(s.id)}
            />
          ))}
        </motion.div>

        {filteredSolutions.length === 0 && (
          <div className="text-center py-12 text-nest-muted">
            <p>暂无符合条件的方案，请调整筛选条件</p>
          </div>
        )}

        {/* 展开的方案详情 */}
        <AnimatePresence>
          {expandedSolution && (
            <SolutionDetail solution={expandedSolution} />
          )}
        </AnimatePresence>
      </section>

      <CasesSection />
      <CtaSection />
    </motion.div>
  );
}
