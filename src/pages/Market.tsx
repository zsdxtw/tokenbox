import { useState, useMemo } from "react";
import { SlidersHorizontal, X, TrendingUp, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import EquipmentCard from "@/components/EquipmentCard";
import {
  equipmentList,
  type EquipmentCategory,
  type Condition,
} from "@/data/equipment";
import { priceIndexSeries } from "@/data/priceIndex";
import { cn } from "@/lib/utils";

const categoryOptions: { value: EquipmentCategory | "all"; label: string }[] = [
  { value: "all", label: "全部分类" },
  { value: "gpu-server", label: "GPU 服务器" },
  { value: "cpu-server", label: "CPU 服务器" },
  { value: "network", label: "网络设备" },
  { value: "storage", label: "存储设备" },
  { value: "mining", label: "矿机" },
  { value: "power", label: "电力设备" },
  { value: "cooling", label: "制冷散热" },
  { value: "rack", label: "机柜设施" },
];

const conditionOptions = [
  { value: "all", label: "全部成色" },
  { value: "new", label: "全新" },
  { value: "A", label: "A级" },
  { value: "B", label: "B级" },
  { value: "certified", label: "认证" },
  { value: "preferred", label: "优选" },
];

const brandOptions = ["全部品牌", "NVIDIA", "Supermicro", "华为", "浪潮", "Samsung", "施耐德", "维谛", "神盾", "图灵"];

const sortOptions = [
  { value: "default", label: "默认排序" },
  { value: "price-asc", label: "价格从低到高" },
  { value: "price-desc", label: "价格从高到低" },
  { value: "new", label: "最新上架" },
];

export default function Market() {
  const [category, setCategory] = useState<EquipmentCategory | "all">("all");
  const [condition, setCondition] = useState<Condition | "all">("all");
  const [brand, setBrand] = useState("全部品牌");
  const [isNewOnly, setIsNewOnly] = useState(false);
  const [isSelfRun, setIsSelfRun] = useState(false);
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState("default");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let list = equipmentList.filter((eq) => {
      if (category !== "all" && eq.category !== category) return false;
      if (condition !== "all" && eq.condition !== condition) return false;
      if (brand !== "全部品牌" && eq.brand !== brand) return false;
      if (isNewOnly && !eq.isNew) return false;
      if (isSelfRun && !eq.isSelfRun) return false;
      if (priceRange > 0 && eq.price > priceRange) return false;
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [category, condition, brand, isNewOnly, isSelfRun, priceRange, sort]);

  const FilterPanel = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold text-ink-900 uppercase tracking-wider mb-3">
          设备层级
        </h3>
        <div className="flex flex-col gap-1.5">
          {categoryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value)}
              className={cn(
                "text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                category === opt.value
                  ? "bg-cyan-50 text-cyan-700 font-medium"
                  : "text-ink-600 hover:bg-ink-50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-xs font-semibold text-ink-900 uppercase tracking-wider mb-3">成色等级</h3>
        <div className="flex flex-wrap gap-1.5">
          {conditionOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCondition(opt.value as Condition | "all")}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md border transition-colors",
                condition === opt.value
                  ? "border-cyan-300 bg-cyan-50 text-cyan-700"
                  : "border-ink-200 text-ink-600 hover:border-ink-300"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="text-xs font-semibold text-ink-900 uppercase tracking-wider mb-3">品牌</h3>
        <div className="flex flex-col gap-1.5">
          {brandOptions.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={cn(
                "text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                brand === b
                  ? "bg-cyan-50 text-cyan-700 font-medium"
                  : "text-ink-600 hover:bg-ink-50"
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-xs font-semibold text-ink-900 uppercase tracking-wider mb-3">
          价格上限
        </h3>
        <input
          type="range"
          min={0}
          max={4000000}
          step={100000}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
        <div className="mt-2 flex justify-between text-xs text-ink-500">
          <span>不限</span>
          <span className="font-mono text-cyan-600">
            {priceRange === 0 ? "不限" : `¥${priceRange.toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isNewOnly}
            onChange={(e) => setIsNewOnly(e.target.checked)}
            className="rounded accent-cyan-500"
          />
          <span className="text-sm text-ink-700">仅看全新</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelfRun}
            onChange={(e) => setIsSelfRun(e.target.checked)}
            className="rounded accent-cyan-500"
          />
          <span className="text-sm text-ink-700">平台自营</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-ink-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-ink-100">
        <div className="container py-8">
          <div className="flex items-center gap-2 text-xs text-ink-500 mb-2">
            <span>首页</span>
            <span>/</span>
            <span className="text-ink-900">设备交易</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink-900">设备交易</h1>
          <p className="mt-2 text-sm text-ink-500">
            一手自营 + 二手认证设备，覆盖六大设备层级全品类交易
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-ink-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-base font-bold text-ink-900">筛选条件</h2>
                <SlidersHorizontal className="h-4 w-4 text-ink-400" />
              </div>
              {FilterPanel}
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-ink-200 rounded-md bg-white"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  筛选
                </button>
                <span className="text-sm text-ink-500">
                  共 <span className="font-mono font-semibold text-ink-900">{filtered.length}</span> 件商品
                </span>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 text-sm border border-ink-200 rounded-md bg-white focus:outline-none focus:border-cyan-400"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((eq) => (
                  <EquipmentCard key={eq.id} equipment={eq} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-ink-200 p-16 text-center">
                <p className="text-sm text-ink-500">没有符合条件的设备，请调整筛选条件</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Price index section */}
      <section className="bg-white border-t border-ink-100">
        <div className="container py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-cyan-500" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-600">
                  PRICE INDEX
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-ink-900">设备价格指数</h2>
              <p className="mt-1 text-xs text-ink-500">
                基于平台实际成交数据加权计算，反映设备市场供需变化与价格趋势
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {priceIndexSeries.map((series) => {
              const isUp = series.changePercent >= 0;
              return (
                <div
                  key={series.id}
                  className="p-5 bg-ink-50 rounded-xl hover:bg-white hover:border-cyan-300 border border-transparent transition-all"
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

      {/* Mobile filter drawer */}
      {showMobileFilter && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-ink-900/50"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-base font-bold text-ink-900">筛选条件</h2>
              <button onClick={() => setShowMobileFilter(false)}>
                <X className="h-5 w-5 text-ink-500" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setShowMobileFilter(false)}
              className="mt-6 w-full py-2.5 bg-cyan-500 text-white rounded-md font-medium"
            >
              查看 {filtered.length} 件商品
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
