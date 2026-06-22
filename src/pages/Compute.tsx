import { Link } from "react-router-dom";
import { Cpu, MapPin, Clock, Star, Leaf, ArrowRight, Plus, Zap } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { computeListings } from "@/data/platform";

export default function Compute() {
  return (
    <div className="bg-ink-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] glow-cyan opacity-40" />
        <div className="container relative py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                COMPUTE SHARING
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              算力共享与租赁市场
            </h1>
            <p className="mt-4 text-base text-ink-300 leading-relaxed">
              2024 年全球算力租赁市场规模突破 121 亿美元，预计 2028 年达 177 亿美元。
              平台延伸设备交易场景，接入算力共享功能，将设备交易延伸为持续运营服务。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-ink-900 font-medium rounded-md transition-colors">
                <Plus className="h-4 w-4" />
                发布算力
              </button>
              <Link
                to="/market"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink-600 hover:border-cyan-400 text-white font-medium rounded-md transition-colors"
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
              <div key={stat.label}>
                <div className="font-mono text-2xl font-bold text-ink-900">{stat.value}</div>
                <div className="mt-1 text-xs text-ink-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="container py-16">
        <SectionHeader
          eyebrow="LISTINGS"
          title="在租算力资源"
          description="设备所有者可将闲置算力上架出租，按卡/小时或 Token 用量计费。"
        />

        <div className="bg-white rounded-xl border border-ink-200 overflow-hidden">
          {/* Table header - desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-ink-50 border-b border-ink-100 text-xs font-semibold text-ink-500 uppercase tracking-wider">
            <div className="col-span-3">GPU 型号</div>
            <div className="col-span-1 text-center">卡数</div>
            <div className="col-span-2">所在区域</div>
            <div className="col-span-2">可用时段</div>
            <div className="col-span-1 text-center">互联</div>
            <div className="col-span-2 text-right">单价</div>
            <div className="col-span-1 text-right">操作</div>
          </div>

          {computeListings.map((listing) => (
            <div
              key={listing.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 border-b border-ink-100 last:border-0 hover:bg-cyan-50/30 transition-colors"
            >
              {/* GPU model */}
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="p-2 bg-cyan-50 rounded-md">
                  <Cpu className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ink-900">{listing.gpuModel}</div>
                  <div className="text-xs text-ink-500">显存 {listing.vram}</div>
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

              {/* Interconnect */}
              <div className="md:col-span-1 md:text-center flex items-center gap-2 md:block">
                <span className="md:hidden text-xs text-ink-500">互联：</span>
                <span className="text-xs font-mono text-ink-700">{listing.interconnect}</span>
              </div>

              {/* Price */}
              <div className="md:col-span-2 md:text-right">
                <div className="font-mono text-lg font-bold text-ink-900">
                  ¥{listing.pricePerHour}
                </div>
                <div className="text-xs text-ink-500">{listing.unit}</div>
              </div>

              {/* Action */}
              <div className="md:col-span-1 md:text-right flex items-center md:justify-end gap-2">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-ink-900 hover:bg-cyan-500 hover:text-ink-900 rounded-md transition-colors">
                  租用
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Provider info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {computeListings.slice(0, 3).map((listing) => (
            <div
              key={listing.id}
              className="p-4 bg-white rounded-xl border border-ink-200 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-medium text-ink-900">{listing.provider}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-ink-500">{listing.rating} 评分</span>
                  {listing.greenEnergy && (
                    <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] text-emerald-600">
                      <Leaf className="h-3 w-3" />
                      绿电
                    </span>
                  )}
                </div>
              </div>
              <Zap className="h-5 w-5 text-cyan-500" />
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-ink-100">
        <div className="container py-16">
          <SectionHeader
            eyebrow="HOW IT WORKS"
            title="算力共享模式"
            description="设备所有者在平台发布算力出租信息，算力需求方下单租用，平台调度算力资源并计量计费。"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: "01", title: "发布算力", desc: "设备所有者发布 GPU 型号、数量、可用时段、计费方式" },
              { step: "02", title: "下单租用", desc: "算力需求方按需下单租用，按卡/小时或 Token 计费" },
              { step: "03", title: "调度计量", desc: "平台调度算力资源，自动计量计费" },
              { step: "04", title: "收入分成", desc: "收入按比例分成，平台抽成 15-20%" },
            ].map((item) => (
              <div key={item.step} className="p-5 bg-ink-50 rounded-xl">
                <div className="font-mono text-3xl font-bold text-cyan-200 mb-3">{item.step}</div>
                <h3 className="font-serif text-base font-bold text-ink-900 mb-2">{item.title}</h3>
                <p className="text-xs text-ink-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 p-10 md:p-14">
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-900 tracking-tight">
                有闲置算力？立即上架变现
              </h2>
              <p className="mt-2 text-sm text-ink-800">
                将闲置 GPU 算力上架出租，按卡/小时计费，平台调度自动结算。
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 hover:bg-ink-800 text-white font-medium rounded-md transition-colors shrink-0">
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
