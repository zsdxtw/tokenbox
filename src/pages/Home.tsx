import { Link } from "react-router-dom";
import {
  ArrowRight,
  Package,
  RefreshCw,
  Landmark,
  Wrench,
  ShieldCheck,
  Cpu,
  Network,
  HardDrive,
  Server,
  Zap,
  Snowflake,
  Database,
  Newspaper,
  Code2,
  Building2,
  User,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import EquipmentCard from "@/components/EquipmentCard";
import { featuredEquipment } from "@/data/equipment";
import { solutionScenarios, solutionCases } from "@/data/solutions";
import { policyArticles } from "@/data/policy";

const coreStats = [
  { value: "2,600亿+", label: "2026 算力租赁市场规模", unit: "元" },
  { value: "417%", label: "2026 Q1 AI 算力需求同比增长", unit: "" },
  { value: "62%", label: "2025 Q3 二手 H100 交易量增速", unit: "" },
  { value: "4,500亿", label: "2026 全国算力基建投资", unit: "元" },
];

const fourBoards = [
  {
    icon: Package,
    title: "一手设备交易",
    subtitle: "集采入口",
    description: "平台自营直采 + 品牌商/经销商入驻撮合，覆盖 GPU 服务器、CPU 服务器、网络设备等全品类新品采购。",
    features: ["招标采购", "集采拼单", "预售锁单", "配置定制"],
    color: "brand",
    path: "/market",
  },
  {
    icon: RefreshCw,
    title: "二手设备交易",
    subtitle: "残值引擎",
    description: "平台自营翻新 + C2B2C 撮合，以平台质检认证为核心信任机制，覆盖退役 GPU 服务器、二手矿机、拆机配件等。",
    features: ["平台质检认证", "A/B/C 级分级", "C2B2C 寄售", "残值评估"],
    color: "emerald",
    path: "/market",
  },
  {
    icon: Landmark,
    title: "金融服务",
    subtitle: "资金杠杆",
    description: "联合金租公司、银行、保险公司，提供融资租赁、分期付款、设备抵押、以旧换新、算力保险等金融产品。",
    features: ["融资租赁", "分期付款", "以旧换新", "残值担保"],
    color: "amber",
    path: "/finance",
  },
  {
    icon: Wrench,
    title: "增值服务",
    subtitle: "交易壁垒",
    description: "验机质检、物流安装、残值评估、数据清除、维修维保、全生命周期管理，构建交易闭环。",
    features: ["验机质检", "物流安装", "数据清除", "维修维保"],
    color: "rose",
    path: "/services",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  brand: { bg: "bg-brand-50", text: "text-brand-600", border: "border-brand-200", dot: "bg-brand-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", dot: "bg-rose-500" },
};

const categories = [
  { icon: Zap, label: "电力基础设施", count: "126" },
  { icon: Snowflake, label: "制冷散热", count: "98" },
  { icon: Cpu, label: "IT 计算设备", count: "1,856" },
  { icon: HardDrive, label: "存储设备", count: "742" },
  { icon: Network, label: "网络设备", count: "423" },
  { icon: Server, label: "机柜设施", count: "318" },
];

export default function Home() {
  const featuredSolutions = solutionScenarios.slice(0, 3);
  const featuredCases = solutionCases.slice(0, 3);
  const featuredPolicy = policyArticles.slice(0, 3);

  return (
    <div>
      {/* Hero - 清新浅色背景 */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] glow-brand opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] glow-brand opacity-30" />

        <div className="container relative py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-200 bg-brand-50 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-dot" />
              <span className="text-xs font-mono text-brand-600 tracking-wider">
                NATIONAL COMPUTE EQUIPMENT EXCHANGE
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.1] text-ink-900">
              全国性算力设备
              <br />
              <span className="text-gradient-brand">B2B 交易平台</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-ink-500 max-w-2xl leading-relaxed">
              覆盖「电力基础设施-制冷散热-IT 计算设备-存储设备-网络设备-机柜设施」六大设备层级全品类交易，
              通过「自营直采+撮合交易」双轮驱动，叠加金融服务与增值服务，
              为算力产业链上下游企业提供全生命周期交易服务。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/market"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-glow text-white font-medium rounded-lg transition-all"
              >
                进入设备市场
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/finance"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-200 hover:border-brand-300 hover:text-brand-600 text-ink-700 font-medium rounded-lg transition-colors bg-white"
              >
                金融服务方案
              </Link>
            </div>
          </div>

          {/* Core stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {coreStats.map((stat) => (
              <div key={stat.label} className="p-6 bg-white rounded-xl border border-ink-200 shadow-soft">
                <div className="font-mono text-3xl md:text-4xl font-bold text-gradient-brand tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-ink-500 leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six categories */}
      <section className="bg-ink-50/50 border-y border-ink-100">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to="/market"
                className="group flex flex-col items-center justify-center p-5 rounded-xl border border-ink-200 bg-white hover:border-brand-300 hover:shadow-card transition-all"
              >
                <cat.icon className="h-7 w-7 text-ink-400 group-hover:text-brand-500 transition-colors" />
                <span className="mt-3 text-xs font-medium text-ink-700 text-center">{cat.label}</span>
                <span className="mt-1 text-[10px] text-ink-400 font-mono">{cat.count} 在售</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Four core boards */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="CORE BOARDS"
          title="四大核心板块协同运转"
          description="以交易为入口、金融为杠杆、服务为壁垒，构建算力设备全生命周期交易生态。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fourBoards.map((board) => {
            const c = colorMap[board.color];
            return (
              <Link
                key={board.title}
                to={board.path}
                className="group relative p-7 bg-white rounded-xl border border-ink-200 card-hover hover:border-brand-300 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${c.dot}`} />
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3 rounded-lg ${c.bg} ${c.border} border`}>
                    <board.icon className={`h-6 w-6 ${c.text}`} />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${c.text}`}>
                    {board.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-ink-900 mb-2">{board.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed mb-5">{board.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {board.features.map((f) => (
                    <span
                      key={f}
                      className={`px-2.5 py-1 text-xs rounded-md ${c.bg} ${c.text}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className={`inline-flex items-center gap-1 text-sm font-medium ${c.text}`}>
                  了解更多
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured equipment */}
      <section className="bg-ink-50/50 border-y border-ink-100">
        <div className="container py-20">
          <SectionHeader
            eyebrow="FEATURED EQUIPMENT"
            title="精选设备"
            description="涵盖一手自营与二手认证设备，平台质检保障交易信任。"
            action={
              <Link
                to="/market"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                查看全部 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredEquipment.slice(0, 4).map((eq) => (
              <EquipmentCard key={eq.id} equipment={eq} />
            ))}
          </div>
        </div>
      </section>

      {/* Compute trading entry */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="COMPUTE TRADING"
          title="算力交易市场"
          description="两类算力交易模式：Token 型直接交付大模型 API，设备租赁型按卡/小时计费。支持智算中心与个体闲散算力入驻。"
          action={
            <Link
              to="/compute"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              进入算力交易 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Token type */}
          <Link
            to="/compute"
            className="group relative p-7 bg-white rounded-xl border border-ink-200 card-hover hover:border-brand-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-500" />
            <div className="flex items-start justify-between mb-5">
              <div className="p-3 rounded-lg bg-brand-50 border border-brand-200">
                <Code2 className="h-6 w-6 text-brand-600" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-600">
                TYPE A · TOKEN
              </span>
            </div>
            <h3 className="text-xl font-bold text-ink-900 mb-2">Token 型算力交易</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-4">
              直接输出大模型 Token，标明算力设备情况与已安装模型版本，按 Token 用量计费。
              用户租用后直接获得 API 接口，开箱即用。
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["按 Token 计费", "API 直交付", "已安装模型", "兼容 OpenAI"].map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] text-brand-700 bg-brand-50 rounded">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <Building2 className="h-3.5 w-3.5" />
              <span>智算中心</span>
              <span className="text-ink-300">·</span>
              <User className="h-3.5 w-3.5" />
              <span>个体算力</span>
            </div>
          </Link>

          {/* Device rental type */}
          <Link
            to="/compute"
            className="group relative p-7 bg-white rounded-xl border border-ink-200 card-hover hover:border-brand-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
            <div className="flex items-start justify-between mb-5">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <Server className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600">
                TYPE B · DEVICE
              </span>
            </div>
            <h3 className="text-xl font-bold text-ink-900 mb-2">设备租赁型算力交易</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-4">
              直接租赁算力设备空间，按卡/小时计费。下单时可提醒出租方安装指定模型并交付 API 接口，
              灵活度更高。
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["按卡/小时计费", "可指定模型", "独占资源", "支持定制"].map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] text-amber-700 bg-amber-50 rounded">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>支持下单时指定安装模型</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Solutions entry */}
      <section className="bg-ink-50/50 border-y border-ink-100">
        <div className="container py-20">
          <SectionHeader
            eyebrow="SOLUTIONS"
            title="行业解决方案"
            description="算力巢自营的综合解决方案，覆盖算力集群建设、绿色供电、算力运营、残值处置等场景。"
            action={
              <Link
                to="/solutions"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                全部方案 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredSolutions.map((scenario) => (
              <Link
                key={scenario.id}
                to="/solutions"
                className="group p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-brand-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-brand-50 border border-brand-200">
                    <span className="font-mono text-sm font-bold text-brand-600">
                      {scenario.name.slice(0, 2)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-600">
                    {scenario.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-1 group-hover:text-brand-600 transition-colors">
                  {scenario.name}
                </h3>
                <p className="text-xs text-brand-600 font-medium mb-3">{scenario.tagline}</p>
                <p className="text-sm text-ink-500 leading-relaxed line-clamp-2 mb-4">
                  {scenario.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scenario.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="px-2 py-0.5 text-[10px] text-brand-700 bg-brand-50 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Featured cases */}
          <div className="mt-8">
            <h3 className="text-base font-bold text-ink-900 mb-4">落地案例</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  to="/solutions"
                  className="group p-5 bg-white rounded-xl hover:border-brand-300 border border-ink-200 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-1.5 py-0.5 text-[10px] font-medium text-brand-700 bg-brand-50 rounded">
                      {caseItem.scenario}
                    </span>
                    <span className="text-[10px] text-ink-400">{caseItem.completionDate}</span>
                  </div>
                  <h4 className="text-sm font-medium text-ink-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                    {caseItem.title}
                  </h4>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {caseItem.results.slice(0, 2).map((r) => (
                      <div key={r.label} className="text-xs">
                        <div className="font-mono font-bold text-ink-900">{r.value}</div>
                        <div className="text-[10px] text-ink-500">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust mechanism */}
      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-brand-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-brand-600">
                TRUST MECHANISM
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink-900">
              平台信任机制
            </h2>
            <p className="mt-4 text-sm text-ink-500 leading-relaxed">
              以质检认证为核心，设备指纹为数据基础，担保交易为资金保障，构建算力设备交易的完整信任闭环。
            </p>
            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              了解质检流程 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "标准化质检认证",
                desc: "覆盖 GPU 服务器、CPU 服务器、网络设备等品类，72h 压力测试，A/B/C 级分级认证。",
              },
              {
                icon: Database,
                title: "设备指纹数据库",
                desc: "为每台设备建立唯一数字身份，记录全生命周期信息，防伪溯源与残值评估数据基础。",
              },
              {
                icon: Landmark,
                title: "担保交易与先行赔付",
                desc: "买方付款至平台担保账户，验收确认后释放货款，争议平台介入仲裁并先行赔付。",
              },
              {
                icon: RefreshCw,
                title: "残值担保",
                desc: "承诺期满残值不低于约定比例，低于约定值平台补足差额或按约定价回购。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-ink-200 bg-white hover:border-brand-300 hover:shadow-card transition-all"
              >
                <item.icon className="h-6 w-6 text-brand-500 mb-3" />
                <h3 className="text-base font-semibold text-ink-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy news */}
      <section className="bg-ink-50/50 border-y border-ink-100">
        <div className="container py-20">
          <SectionHeader
            eyebrow="POLICY & NEWS"
            title="政策资讯"
            description="聚焦人工智能、算力设备、智算中心领域的最新政府政策、行业规范与企业动态。"
            action={
              <Link
                to="/policy"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                全部资讯 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPolicy.map((article) => (
              <Link
                key={article.id}
                to="/policy"
                className="group block p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-brand-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-medium text-brand-700 bg-brand-50 rounded">
                    {article.category}
                  </span>
                  {article.isHot && (
                    <span className="px-1.5 py-0.5 text-[10px] text-rose-600 bg-rose-50 rounded">
                      热门
                    </span>
                  )}
                  <span className="text-[10px] text-ink-400">{article.publishDate}</span>
                </div>
                <h3 className="text-base font-semibold text-ink-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-3 text-xs text-ink-500 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-400">
                  <span className="flex items-center gap-1">
                    <Newspaper className="h-3 w-3" />
                    {article.source}
                  </span>
                  <span>{article.readTime}阅读</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-10 md:p-14">
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
          <div className="absolute -top-20 -right-20 w-80 h-80 glow-brand opacity-40" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                开启算力设备交易之旅
              </h2>
              <p className="mt-2 text-sm text-brand-100">
                企业资质认证后即可发布采购需求、上架设备、申请金融方案。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/market"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-brand-50 text-brand-600 font-medium rounded-lg transition-colors"
              >
                浏览设备市场 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/bidding"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
              >
                发布采购需求
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
