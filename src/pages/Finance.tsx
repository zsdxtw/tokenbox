import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Landmark, Building2, RefreshCw, Gavel,
  ChevronRight, Phone, Calculator, Clock,
  Banknote, ShieldCheck, TrendingUp, Check,
  BarChart3, University, HandCoins, Wallet,
  FileCheck, FileText, CircleDollarSign, Sparkles,
  ArrowUpRight, Percent,
} from 'lucide-react';
import {
  financeServices, financeCaseStudies, financePartners, financeProcessSteps,
  serviceColorMap,
  type FinanceServiceKey,
} from '@/data/finance';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// 图标映射
const iconMap: Record<string, React.ElementType> = {
  Landmark, Building2, RefreshCw, Gavel, Phone, Calculator, Clock,
  Banknote, ShieldCheck, TrendingUp, Check, BarChart3, University,
  HandCoins, Wallet, FileCheck, FileText, CircleDollarSign, Sparkles,
  ArrowUpRight, Percent,
};

// ============ Hero ============
function FinanceHero() {
  return (
    <section className="relative overflow-hidden py-20 px-4 bg-nest-bg">
      {/* 径向光晕 - 使用nest-yellow为主色 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,214,0,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          算力<span className="text-nest-yellow">金融服务</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-nest-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8"
        >
          从设备采购到资产退出，覆盖算力设备全生命周期的金融解决方案。抵押融资、集群建设、二手交易、资产处置，一站式服务。
        </motion.p>

        {/* 装饰条 - 金色主调 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 max-w-md mx-auto"
        >
          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-nest-yellow via-nest-orange to-nest-blue" />
          <CircleDollarSign className="w-5 h-5 text-nest-yellow" />
          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-nest-blue via-[#7B61FF] to-nest-yellow" />
        </motion.div>
      </div>
    </section>
  );
}

// ============ 服务概览数据条 ============
function FinanceOverview() {
  const stats = [
    { label: '累计融资', value: '¥120亿+', icon: CircleDollarSign, color: 'text-nest-yellow' },
    { label: '服务客户', value: '2,000+', icon: University, color: 'text-nest-blue' },
    { label: '合作银行', value: '50+', icon: HandCoins, color: 'text-nest-orange' },
    { label: '平均审批', value: '3天', icon: Clock, color: 'text-[#7B61FF]' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-nest-card border border-nest-border rounded-lg p-5 text-center hover:border-nest-yellow/40 transition-colors"
          >
            <s.icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
            <div className="font-mono text-2xl font-bold text-nest-text">{s.value}</div>
            <div className="text-xs text-nest-muted mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============ 服务卡片 ============
function ServiceCards() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-nest-text">核心金融服务</h2>
          <p className="text-sm text-nest-muted mt-1">覆盖算力设备全生命周期的四大金融产品</p>
        </div>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-nest-border text-nest-text rounded-md hover:bg-nest-surface transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          咨询顾问
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {financeServices.map((svc) => {
          const colors = serviceColorMap[svc.id];
          const IconComponent = iconMap[svc.icon] || Landmark;

          return (
            <motion.div key={svc.id} variants={item}>
              <div className="bg-nest-card border border-nest-border rounded-lg overflow-hidden transition-all duration-300 hover:border-nest-yellow/50 hover:-translate-y-0.5 group">
                {/* 顶部色条 */}
                <div className={`h-[3px] w-full ${colors.bar}`} />

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text} shrink-0`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-semibold text-nest-text mb-1">{svc.title}</h3>
                      <p className="text-sm text-nest-muted leading-relaxed line-clamp-2">{svc.description}</p>
                    </div>
                  </div>

                  {/* 特性标签 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {svc.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono font-medium rounded border border-nest-border bg-nest-surface text-nest-muted"
                      >
                        <Check className="w-3 h-3 text-nest-green" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-sm font-medium text-nest-yellow hover:gap-2 transition-all duration-200"
                  >
                    了解详情
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// ============ 业务流程 ============
function ProcessFlow() {
  const stepIcons: Record<string, React.ElementType> = {
    Phone, Calculator, FileCheck, Banknote, ShieldCheck,
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="font-display text-2xl font-bold text-nest-text mb-2">业务流程</h2>
      <p className="text-sm text-nest-muted mb-8">从咨询到放款，标准化流程确保高效安全</p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative"
      >
        {/* 连接线 */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px border-t border-dashed border-nest-border" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
          {financeProcessSteps.map((step) => {
            const StepIcon = stepIcons[step.icon] || Calculator;
            return (
              <motion.div key={step.step} variants={item} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-nest-card border-2 border-nest-yellow/30 mb-3 hover:border-nest-yellow hover:shadow-[0_0_20px_rgba(255,214,0,0.2)] transition-all">
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-nest-yellow text-nest-bg text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                  <StepIcon className="w-6 h-6 text-nest-yellow" />
                </div>
                <h3 className="text-sm font-semibold text-nest-text mb-1">{step.title}</h3>
                <p className="text-xs text-nest-muted leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ============ 案例研究 ============
function CasesSection() {
  const industryStyles: Record<string, { bg: string; text: string }> = {
    ai:    { bg: 'bg-nest-yellow/10', text: 'text-nest-yellow' },
    cloud: { bg: 'bg-nest-blue/10',   text: 'text-nest-blue' },
    energy:{ bg: 'bg-[#7B61FF]/10',   text: 'text-[#7B61FF]' },
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
        {financeCaseStudies.map((cs) => {
          const style = industryStyles[cs.industry] || industryStyles.ai;
          return (
            <motion.div key={cs.id} variants={item}>
              <div className="bg-nest-card border border-nest-border rounded-lg overflow-hidden">
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

// ============ 合作银行 ============
function PartnerBanks() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="font-display text-2xl font-bold text-nest-text mb-2">合作金融机构</h2>
      <p className="text-sm text-nest-muted mb-8">携手50+银行及金融机构，为您提供最优质的资金渠道</p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {financePartners.map((p) => (
          <motion.div key={p.name} variants={item}>
            <div className="bg-nest-card border border-nest-border rounded-lg p-4 flex items-center gap-3 hover:border-nest-yellow/40 hover:-translate-y-0.5 transition-all duration-300">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <div className="text-sm font-semibold text-nest-text">{p.name}</div>
                <div className="text-xs text-nest-muted">{p.type}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============ 底部 CTA ============
function FinanceCta() {
  return (
    <section className="py-20 px-4 bg-nest-surface border-t border-nest-border text-center">
      <div className="max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-nest-yellow/10 mb-6">
          <Sparkles className="w-7 h-7 text-nest-yellow" />
        </div>
        <h2 className="font-display text-2xl font-bold text-nest-text mb-2">开启算力金融之旅</h2>
        <p className="text-sm text-nest-muted mb-8">
          专属金融顾问1对1服务，为您的算力业务量身定制最优融资方案。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-nest-yellow text-nest-bg rounded-md hover:brightness-110 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            立即咨询
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-nest-border text-nest-text rounded-md hover:bg-nest-card transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            下载产品手册
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============ 主页面 ============
export default function Finance() {
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
          <span className="text-nest-text">金融服务</span>
        </nav>
      </div>

      <FinanceHero />
      <FinanceOverview />
      <ServiceCards />
      <ProcessFlow />
      <CasesSection />
      <PartnerBanks />
      <FinanceCta />
    </motion.div>
  );
}
