import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Newspaper,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import SectionHeader from "@/components/SectionHeader";
import { priceIndexSeries, newsArticles } from "@/data/priceIndex";
import { cn } from "@/lib/utils";

export default function PriceIndex() {
  const [activeSeries, setActiveSeries] = useState(priceIndexSeries[0]);
  const [activeCategory, setActiveCategory] = useState("全部");

  const categories = ["全部", "GPU 模组", "二手 GPU", "CPU 服务器"];

  const filteredSeries =
    activeCategory === "全部"
      ? priceIndexSeries
      : priceIndexSeries.filter((s) => s.category === activeCategory);

  return (
    <div className="bg-ink-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] glow-cyan opacity-40" />
        <div className="container relative py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                PRICE INDEX
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              算力设备价格指数
            </h1>
            <p className="mt-4 text-base text-ink-300 leading-relaxed">
              基于平台实际成交数据加权计算，覆盖 GPU、CPU 服务器、网络设备、存储设备等主要品类，
              反映市场供需变化与价格趋势。价格指数免费公开，为行业提供定价参考。
            </p>
          </div>
        </div>
      </section>

      {/* Main chart */}
      <section className="container py-16">
        <SectionHeader
          eyebrow="MARKET TRENDS"
          title="价格走势看板"
          description="选择设备型号查看历史价格走势，掌握市场动态。"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Series selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-ink-200 p-3 space-y-1">
              {priceIndexSeries.map((series) => {
                const isUp = series.changePercent >= 0;
                const isActive = activeSeries.id === series.id;
                return (
                  <button
                    key={series.id}
                    onClick={() => setActiveSeries(series)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors",
                      isActive ? "bg-cyan-50 border border-cyan-200" : "hover:bg-ink-50 border border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "text-xs",
                        isActive ? "text-cyan-700 font-medium" : "text-ink-500"
                      )}>
                        {series.category}
                      </span>
                      <span className={cn(
                        "flex items-center gap-0.5 text-[10px] font-mono",
                        isUp ? "text-rose-500" : "text-emerald-500"
                      )}>
                        {isUp ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                        {isUp ? "+" : ""}{series.changePercent}%
                      </span>
                    </div>
                    <div className={cn(
                      "text-sm font-medium",
                      isActive ? "text-ink-900" : "text-ink-700"
                    )}>
                      {series.model}
                    </div>
                    <div className="font-mono text-sm font-bold text-ink-900 mt-1">
                      {series.currentPrice.toLocaleString()}
                      <span className="text-[10px] text-ink-400 font-sans ml-1">{series.unit}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-ink-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs text-ink-500">{activeSeries.category}</div>
                  <h3 className="font-serif text-2xl font-bold text-ink-900 mt-1">
                    {activeSeries.model}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-mono text-3xl font-bold text-ink-900">
                    {activeSeries.currentPrice.toLocaleString()}
                  </div>
                  <div className={cn(
                    "flex items-center justify-end gap-1 text-sm font-mono",
                    activeSeries.changePercent >= 0 ? "text-rose-500" : "text-emerald-500"
                  )}>
                    {activeSeries.changePercent >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {activeSeries.changePercent >= 0 ? "+" : ""}
                    {activeSeries.changePercent}%
                    <span className="text-xs text-ink-400 ml-1">较上月</span>
                  </div>
                </div>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeSeries.trend}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={activeSeries.changePercent >= 0 ? "#ef4444" : "#10b981"}
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor={activeSeries.changePercent >= 0 ? "#ef4444" : "#10b981"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => v.toLocaleString()}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                      formatter={(v: number) => [v.toLocaleString(), "价格"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={activeSeries.changePercent >= 0 ? "#ef4444" : "#10b981"}
                      strokeWidth={2}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between text-xs text-ink-500">
                <span>数据来源：算力巢平台实际成交数据加权计算</span>
                <span>单位：{activeSeries.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All series grid */}
      <section className="bg-white border-y border-ink-100">
        <div className="container py-16">
          <SectionHeader
            eyebrow="ALL INDICES"
            title="全品类价格指数"
            description="按品类查看各型号算力设备的价格指数与涨跌幅。"
          />

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 text-sm rounded-md border transition-colors",
                  activeCategory === cat
                    ? "border-cyan-300 bg-cyan-50 text-cyan-700 font-medium"
                    : "border-ink-200 text-ink-600 hover:border-ink-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSeries.map((series) => {
              const isUp = series.changePercent >= 0;
              return (
                <div
                  key={series.id}
                  className="p-5 bg-ink-50 rounded-xl hover:bg-white hover:border-cyan-300 border border-transparent transition-all cursor-pointer"
                  onClick={() => {
                    setActiveSeries(series);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs text-ink-500">{series.category}</div>
                      <div className="text-sm font-medium text-ink-900 mt-0.5">{series.model}</div>
                    </div>
                    <div className={cn(
                      "flex items-center gap-0.5 text-xs font-mono px-1.5 py-0.5 rounded",
                      isUp ? "text-rose-600 bg-rose-50" : "text-emerald-600 bg-emerald-50"
                    )}>
                      {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {isUp ? "+" : ""}{series.changePercent}%
                    </div>
                  </div>
                  <div className="font-mono text-xl font-bold text-ink-900">
                    {series.currentPrice.toLocaleString()}
                    <span className="text-xs text-ink-400 font-sans ml-1">{series.unit}</span>
                  </div>

                  <div className="mt-3 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={series.trend}>
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={isUp ? "#ef4444" : "#10b981"}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container py-16">
        <SectionHeader
          eyebrow="INDUSTRY INSIGHTS"
          title="行业资讯中心"
          description="算力设备行业动态、政策解读、技术趋势与市场分析。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsArticles.map((news) => (
            <article
              key={news.id}
              className="group p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-cyan-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[10px] font-medium text-cyan-700 bg-cyan-50 rounded">
                  {news.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-ink-400">
                  <Clock className="h-3 w-3" />
                  {news.date}
                </span>
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
                <span className="flex items-center gap-1 group-hover:text-cyan-600 transition-colors">
                  {news.readTime}阅读
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
