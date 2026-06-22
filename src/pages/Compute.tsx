import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  MapPin,
  Clock,
  Star,
  Leaf,
  ArrowRight,
  Plus,
  Zap,
  Code2,
  Building2,
  User,
  CheckCircle2,
  Terminal,
  Server,
  TrendingUp,
  TrendingDown,
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
import {
  computeListings,
  tokenListings,
  type ComputeProviderType,
} from "@/data/platform";
import { priceIndexSeries } from "@/data/priceIndex";
import { cn } from "@/lib/utils";

type ListingTab = "token" | "device";
type ProviderFilter = "all" | ComputeProviderType;

const providerTypeLabel: Record<ComputeProviderType, string> = {
  center: "智算中心",
  individual: "个体算力",
};

function ProviderBadge({ type }: { type: ComputeProviderType }) {
  const isCenter = type === "center";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border",
        isCenter
          ? "bg-brand-50 text-brand-700 border-brand-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
      )}
    >
      {isCenter ? <Building2 className="h-2.5 w-2.5" /> : <User className="h-2.5 w-2.5" />}
      {providerTypeLabel[type]}
    </span>
  );
}

function ProviderFilterTabs({
  value,
  onChange,
}: {
  value: ProviderFilter;
  onChange: (v: ProviderFilter) => void;
}) {
  const options: { value: ProviderFilter; label: string }[] = [
    { value: "all", label: "全部来源" },
    { value: "center", label: "智算中心" },
    { value: "individual", label: "个体闲散算力" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-3 py-1.5 text-xs rounded-md border transition-colors",
            value === opt.value
              ? "border-brand-300 bg-brand-50 text-brand-700 font-medium"
              : "border-ink-200 text-ink-600 hover:border-ink-300"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function Compute() {
  const [activeTab, setActiveTab] = useState<ListingTab>("token");
  const [providerFilter, setProviderFilter] = useState<ProviderFilter>("all");

  const filteredTokens = tokenListings.filter(
    (t) => providerFilter === "all" || t.providerType === providerFilter
  );
  const filteredDevices = computeListings.filter(
    (c) => providerFilter === "all" || c.providerType === providerFilter
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero - 清新浅色背景 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white border-b border-ink-100">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] glow-brand opacity-50" />
        <div className="container relative py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-brand-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-brand-600">
                COMPUTE TRADING
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900">
              算力交易市场
            </h1>
            <p className="mt-4 text-base text-ink-500 leading-relaxed">
              2024 年全球算力租赁市场规模突破 121 亿美元，预计 2028 年达 177 亿美元。
              算力巢提供两类算力交易模式：Token 型直接交付大模型 API，按用量计费；
              设备租赁型按卡/小时计费，下单时可指定安装模型并交付 API。
              支持大型智算中心与个体闲散算力入驻。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-glow text-white font-medium rounded-lg transition-all">
                <Plus className="h-4 w-4" />
                发布算力
              </button>
              <Link
                to="/market"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink-200 hover:border-brand-300 hover:text-brand-600 text-ink-700 font-medium rounded-lg transition-colors bg-white"
              >
                浏览设备市场
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-ink-100">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "121 亿美元", label: "2024 全球算力租赁市场" },
              { value: "177 亿美元", label: "2028 预计市场规模" },
              { value: "15-20%", label: "平台抽成比例" },
              { value: "45%", label: "2025 绿色算力占比" },
            ].map((stat) => (
              <div key={stat.label} className="p-5 bg-white rounded-xl border border-ink-200 shadow-soft">
                <div className="font-mono text-2xl font-bold text-gradient-brand">{stat.value}</div>
                <div className="mt-1 text-xs text-ink-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two types intro */}
      <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Token type */}
          <button
            onClick={() => setActiveTab("token")}
            className={cn(
              "group text-left p-6 bg-white rounded-xl border-2 transition-all",
              activeTab === "token"
                ? "border-brand-400 shadow-card"
                : "border-ink-200 hover:border-brand-300"
            )}
          >
            <div className="flex items-start justify-between mb-4">
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
            <div className="flex flex-wrap gap-1.5">
              {["按 Token 计费", "API 直交付", "已安装模型", "兼容 OpenAI"].map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] text-brand-700 bg-brand-50 rounded">
                  {t}
                </span>
              ))}
            </div>
          </button>

          {/* Device rental type */}
          <button
            onClick={() => setActiveTab("device")}
            className={cn(
              "group text-left p-6 bg-white rounded-xl border-2 transition-all",
              activeTab === "device"
                ? "border-brand-400 shadow-card"
                : "border-ink-200 hover:border-brand-300"
            )}
          >
            <div className="flex items-start justify-between mb-4">
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
            <div className="flex flex-wrap gap-1.5">
              {["按卡/小时计费", "可指定模型", "独占资源", "支持定制"].map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] text-amber-700 bg-amber-50 rounded">
                  {t}
                </span>
              ))}
            </div>
          </button>
        </div>
      </section>

      {/* Listings */}
      <section className="container pb-16">
        {/* Tab switcher */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2 border-b border-ink-200">
            <button
              onClick={() => setActiveTab("token")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "token"
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              )}
            >
              <Code2 className="h-4 w-4" />
              Token 型（{tokenListings.length}）
            </button>
            <button
              onClick={() => setActiveTab("device")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "device"
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              )}
            >
              <Server className="h-4 w-4" />
              设备租赁型（{computeListings.length}）
            </button>
          </div>
          <ProviderFilterTabs value={providerFilter} onChange={setProviderFilter} />
        </div>

        {/* Token listings */}
        {activeTab === "token" && (
          <div>
            <SectionHeader
              eyebrow="TOKEN API"
              title="大模型 Token 算力"
              description="已部署的大模型 API 接口，按 Token 用量计费，租用后直接获得 API 端点与密钥。"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredTokens.map((listing) => (
                <div
                  key={listing.id}
                  className="p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-brand-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600">
                        <Terminal className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-ink-900">
                            {listing.modelName}
                          </h3>
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-ink-500 bg-ink-50 rounded">
                            {listing.modelVersion}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-ink-500">
                          <span>{listing.modelSize}</span>
                          <span>·</span>
                          <span>上下文 {listing.contextWindow}</span>
                        </div>
                      </div>
                    </div>
                    <ProviderBadge type={listing.providerType} />
                  </div>

                  {/* GPU info */}
                  <div className="mb-4 p-3 bg-ink-50 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-ink-600 mb-1">
                      <Cpu className="h-3.5 w-3.5 text-ink-400" />
                      <span className="text-ink-500">算力设备</span>
                    </div>
                    <div className="text-sm font-medium text-ink-900">{listing.gpuModel}</div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-ink-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {listing.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {listing.throughput}
                      </span>
                      {listing.greenEnergy && (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Leaf className="h-3 w-3" />
                          绿电
                        </span>
                      )}
                    </div>
                  </div>

                  {/* API endpoint */}
                  <div className="mb-4">
                    <div className="text-[10px] text-ink-500 mb-1">API 端点</div>
                    <div className="flex items-center gap-2 p-2 bg-ink-900 rounded-md">
                      <Code2 className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                      <code className="text-xs text-brand-300 font-mono truncate">
                        {listing.apiEndpoint}
                      </code>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {listing.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] text-brand-700 bg-brand-50 rounded"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-2xl font-bold text-brand-600">
                          ¥{listing.pricePerMillionTokens}
                        </span>
                        <span className="text-xs text-ink-500">/{listing.unit.replace("元/", "")}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-ink-500">
                        <Star className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
                        {listing.rating} · {listing.provider}
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-glow rounded-md transition-all">
                      获取 API
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Device listings */}
        {activeTab === "device" && (
          <div>
            <SectionHeader
              eyebrow="DEVICE RENTAL"
              title="设备租赁算力"
              description="按卡/小时计费的算力设备租赁，下单时可指定出租方安装模型并交付 API 接口。"
            />
            <div className="bg-white rounded-xl border border-ink-200 overflow-hidden">
              {/* Table header - desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-ink-50 border-b border-ink-100 text-xs font-semibold text-ink-500 uppercase tracking-wider">
                <div className="col-span-3">GPU 型号</div>
                <div className="col-span-1 text-center">卡数</div>
                <div className="col-span-2">所在区域</div>
                <div className="col-span-2">可用时段</div>
                <div className="col-span-1 text-center">定制模型</div>
                <div className="col-span-2 text-right">单价</div>
                <div className="col-span-1 text-right">操作</div>
              </div>

              {filteredDevices.map((listing) => (
                <div
                  key={listing.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 border-b border-ink-100 last:border-0 hover:bg-brand-50/30 transition-colors"
                >
                  {/* GPU model */}
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-md">
                      <Cpu className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink-900">{listing.gpuModel}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <ProviderBadge type={listing.providerType} />
                        <span className="text-[10px] text-ink-500">{listing.provider}</span>
                      </div>
                    </div>
                  </div>

                  {/* Count */}
                  <div className="md:col-span-1 md:text-center flex items-center gap-2 md:block">
                    <span className="md:hidden text-xs text-ink-500">卡数：</span>
                    <span className="font-mono text-sm font-bold text-ink-900">{listing.gpuCount}</span>
                  </div>

                  {/* Region */}
                  <div className="md:col-span-2 flex items-center gap-1.5 text-sm text-ink-600">
                    <MapPin className="h-3.5 w-3.5 text-ink-400" />
                    {listing.region}
                  </div>

                  {/* Hours */}
                  <div className="md:col-span-2 flex items-center gap-1.5 text-sm text-ink-600">
                    <Clock className="h-3.5 w-3.5 text-ink-400" />
                    {listing.availableHours}
                  </div>

                  {/* Custom model */}
                  <div className="md:col-span-1 md:text-center flex items-center gap-2 md:block">
                    <span className="md:hidden text-xs text-ink-500">定制模型：</span>
                    {listing.supportCustomModel ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" />
                        支持
                      </span>
                    ) : (
                      <span className="text-[10px] text-ink-400">不支持</span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 md:text-right">
                    <div className="font-mono text-lg font-bold text-brand-600">
                      ¥{listing.pricePerHour}
                    </div>
                    <div className="text-xs text-ink-500">{listing.unit}</div>
                  </div>

                  {/* Action */}
                  <div className="md:col-span-1 md:text-right flex items-center md:justify-end gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-glow rounded-md transition-all">
                      租用
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom model hint */}
            <div className="mt-6 p-5 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 leading-relaxed">
                <strong>下单定制模型提示：</strong>
                标注"支持定制模型"的设备，下单时可在订单备注中指定需要安装的大模型名称与版本，
                出租方将在交付时安装指定模型并同步交付 API 接口。定制模型安装费用根据模型大小单独核算。
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Compute price index */}
      <section className="bg-ink-50/50 border-y border-ink-100">
        <div className="container py-16">
          <SectionHeader
            eyebrow="PRICE INDEX"
            title="算力价格指数"
            description="基于平台实际成交数据加权计算，反映算力与设备市场供需变化与价格趋势。"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {priceIndexSeries.map((series) => {
              const isUp = series.changePercent >= 0;
              return (
                <div
                  key={series.id}
                  className="p-5 bg-white rounded-xl border border-ink-200 card-hover"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs text-ink-500">{series.category}</div>
                      <div className="text-sm font-medium text-ink-900 mt-0.5">{series.model}</div>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-0.5 text-xs font-mono px-1.5 py-0.5 rounded",
                        isUp ? "text-rose-600 bg-rose-50" : "text-emerald-600 bg-emerald-50"
                      )}
                    >
                      {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {isUp ? "+" : ""}{series.changePercent}%
                    </div>
                  </div>
                  <div className="font-mono text-xl font-bold text-ink-900">
                    {series.currentPrice.toLocaleString()}
                    <span className="text-xs text-ink-400 font-sans ml-1">{series.unit}</span>
                  </div>
                  <div className="mt-3 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={series.trend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 9, fill: "#94a3b8" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{
                            fontSize: "11px",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
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

      {/* How it works */}
      <section className="bg-white border-b border-ink-100">
        <div className="container py-16">
          <SectionHeader
            eyebrow="HOW IT WORKS"
            title="算力交易流程"
            description="两种算力交易模式的标准化流程，从发布到结算的全链路服务。"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Token flow */}
            <div className="p-6 bg-brand-50/50 rounded-xl border border-brand-100">
              <div className="flex items-center gap-2 mb-5">
                <Code2 className="h-5 w-5 text-brand-600" />
                <h3 className="text-base font-bold text-ink-900">Token 型流程</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: "01", title: "部署模型", desc: "出租方部署大模型并发布 API 端点" },
                  { step: "02", title: "下单租用", desc: "用户选择模型并下单，获取 API Key" },
                  { step: "03", title: "调用 API", desc: "用户直接调用 API，按 Token 用量计费" },
                  { step: "04", title: "结算分成", desc: "平台自动计量，收入按 15-20% 抽成" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink-900">{item.title}</div>
                      <div className="text-xs text-ink-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device flow */}
            <div className="p-6 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 mb-5">
                <Server className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-ink-900">设备租赁型流程</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: "01", title: "发布算力", desc: "出租方发布 GPU 型号、数量、可用时段" },
                  { step: "02", title: "下单租用", desc: "用户下单，可备注指定安装的模型" },
                  { step: "03", title: "部署交付", desc: "出租方按需安装模型并交付 API 接口" },
                  { step: "04", title: "计量结算", desc: "按卡/小时计费，平台抽成 15-20%" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink-900">{item.title}</div>
                      <div className="text-xs text-ink-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider types */}
      <section className="container py-16">
        <SectionHeader
          eyebrow="PROVIDERS"
          title="算力提供商类型"
          description="平台支持大型智算中心与个体闲散算力入驻，构建多元化算力供给生态。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 bg-white rounded-xl border border-ink-200 card-hover">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-brand-50 border border-brand-200">
                <Building2 className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink-900">大型智算中心</h3>
                <p className="text-xs text-brand-600">规模化的专业算力供给方</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-ink-600">
              {[
                "万卡级 GPU 集群，24×7 稳定供应",
                "支持 H100/H200/A100 等旗舰 GPU",
                "已部署主流大模型，API 即开即用",
                "支持大规模训练与高并发推理",
                "提供 SLA 服务质量保障",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-ink-200 card-hover">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <User className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink-900">个体闲散算力</h3>
                <p className="text-xs text-amber-600">个人与小型工作室的闲置算力</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-ink-600">
              {[
                "个人工作站、高校实验室闲置 GPU",
                "支持 RTX 4090/3090 等消费级显卡",
                "夜间/周末闲置时段灵活出租",
                "适合小模型推理与轻量训练",
                "价格亲民，学生优惠",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-10 md:p-14">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                有闲置算力？立即上架变现
              </h2>
              <p className="mt-2 text-sm text-brand-100">
                无论大型智算中心还是个人闲置 GPU，均可上架出租，平台调度自动结算。
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-ink-50 text-brand-600 font-medium rounded-lg transition-colors shrink-0">
              <Plus className="h-4 w-4" />
              发布算力
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
