import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
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
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import SectionHeader from "@/components/SectionHeader";
import EquipmentCard from "@/components/EquipmentCard";
import { featuredEquipment } from "@/data/equipment";
import { priceIndexSeries, newsArticles } from "@/data/priceIndex";

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
    color: "cyan",
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
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", dot: "bg-cyan-500" },
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
  const featuredPrice = priceIndexSeries.slice(0, 4);
  const featuredNews = newsArticles.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] glow-cyan opacity-60" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] glow-cyan opacity-30" />

        <div className="container relative py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
              <span className="text-xs font-mono text-cyan-300 tracking-wider">
                NATIONAL COMPUTE EQUIPMENT EXCHANGE
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.1]">
              全国性算力设备
              <br />
              <span className="text-gradient-cyan">B2B 交易平台</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-ink-300 max-w-2xl leading-relaxed">
              覆盖"电力基础设施-制冷散热-IT 计算设备-存储设备-网络设备-机柜设施"六大设备层级全品类交易，
              通过"自营直采+撮合交易"双轮驱动，叠加金融服务与增值服务，
              为算力产业链上下游企业提供全生命周期交易服务。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/market"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-ink-900 font-medium rounded-md transition-colors"
              >
                进入设备市场
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/finance"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-600 hover:border-cyan-400 hover:text-cyan-300 text-ink-200 font-medium rounded-md transition-colors"
              >
                金融服务方案
              </Link>
            </div>
          </div>

          {/* Core stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-700/50 rounded-xl overflow-hidden border border-ink-700/50">
            {coreStats.map((stat) => (
              <div key={stat.label} className="bg-ink-900 p-6">
                <div className="font-mono text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-ink-400 leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six categories */}
      <section className="bg-white border-b border-ink-100">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to="/market"
                className="group flex flex-col items-center justify-center p-5 rounded-lg border border-ink-100 hover:border-cyan-300 hover:bg-cyan-50/50 transition-all"
              >
                <cat.icon className="h-7 w-7 text-ink-400 group-hover:text-cyan-500 transition-colors" />
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
                className="group relative p-7 bg-white rounded-xl border border-ink-200 card-hover hover:border-cyan-300 overflow-hidden"
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

                <h3 className="font-serif text-2xl font-bold text-ink-900 mb-2">{board.title}</h3>
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
      <section className="bg-white border-y border-ink-100">
        <div className="container py-20">
          <SectionHeader
            eyebrow="FEATURED EQUIPMENT"
            title="精选设备"
            description="涵盖一手自营与二手认证设备，平台质检保障交易信任。"
            action={
              <Link
                to="/market"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700"
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

      {/* Price index preview */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="PRICE INDEX"
          title="算力设备价格指数"
          description="基于平台实际成交数据加权计算，反映市场供需变化与价格趋势。"
          action={
            <Link
              to="/price-index"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700"
            >
              完整指数 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredPrice.map((series) => {
            const isUp = series.changePercent >= 0;
            return (
              <div
                key={series.id}
                className="p-6 bg-white rounded-xl border border-ink-200 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-ink-500">{series.category}</div>
                    <div className="font-serif text-lg font-bold text-ink-900 mt-1">
                      {series.model}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl font-bold text-ink-900">
                      {series.currentPrice.toLocaleString()}
                    </div>
                    <div
                      className={`flex items-center justify-end gap-0.5 text-xs font-mono ${
                        isUp ? "text-rose-500" : "text-emerald-500"
                      }`}
                    >
                      {isUp ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {isUp ? "+" : ""}
                      {series.changePercent}%
                    </div>
                  </div>
                </div>

                <div className="h-32 -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={series.trend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          fontSize: "12px",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={isUp ? "#ef4444" : "#10b981"}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 text-[10px] text-ink-400 text-right">
                  单位：{series.unit}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust mechanism */}
      <section className="bg-ink-900 text-white">
        <div className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-cyan-500" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  TRUST MECHANISM
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
                平台信任机制
              </h2>
              <p className="mt-4 text-sm text-ink-400 leading-relaxed">
                以质检认证为核心，设备指纹为数据基础，担保交易为资金保障，构建算力设备交易的完整信任闭环。
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
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
                  className="p-5 rounded-xl border border-ink-700 hover:border-cyan-400/50 transition-colors"
                >
                  <item.icon className="h-6 w-6 text-cyan-400 mb-3" />
                  <h3 className="font-serif text-base font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="INDUSTRY INSIGHTS"
          title="行业资讯"
          description="算力设备行业动态、政策解读、技术趋势与市场分析。"
          action={
            <Link
              to="/price-index"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700"
            >
              全部资讯 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredNews.map((news) => (
            <Link
              key={news.id}
              to="/price-index"
              className="group block p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-cyan-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[10px] font-medium text-cyan-700 bg-cyan-50 rounded">
                  {news.category}
                </span>
                <span className="text-[10px] text-ink-400">{news.date}</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-ink-900 leading-snug group-hover:text-cyan-600 transition-colors line-clamp-2">
                {news.title}
              </h3>
              <p className="mt-3 text-xs text-ink-500 leading-relaxed line-clamp-3">
                {news.summary}
              </p>
              <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-400">
                <span className="flex items-center gap-1">
                  <Newspaper className="h-3 w-3" />
                  {news.source}
                </span>
                <span>{news.readTime}阅读</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-ink-100">
        <div className="container py-16">
          <div className="relative overflow-hidden rounded-2xl bg-ink-900 p-10 md:p-14">
            <div className="absolute inset-0 bg-grid-dark opacity-50" />
            <div className="absolute -top-20 -right-20 w-80 h-80 glow-cyan opacity-40" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
                  开启算力设备交易之旅
                </h2>
                <p className="mt-2 text-sm text-ink-400">
                  企业资质认证后即可发布采购需求、上架设备、申请金融方案。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/market"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-ink-900 font-medium rounded-md transition-colors"
                >
                  浏览设备市场 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/bidding"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-ink-600 hover:border-cyan-400 text-white font-medium rounded-md transition-colors"
                >
                  发布采购需求
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
