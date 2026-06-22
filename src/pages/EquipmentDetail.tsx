import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  Truck,
  Star,
  Fingerprint,
  Clock,
  Wrench,
  ChevronRight,
  Calculator,
  Landmark,
  CreditCard,
  Repeat,
  MessageSquare,
} from "lucide-react";
import { getEquipmentById } from "@/data/equipment";
import { cn } from "@/lib/utils";

const conditionStyles: Record<string, string> = {
  new: "bg-cyan-50 text-cyan-700 border-cyan-200",
  A: "bg-emerald-50 text-emerald-700 border-emerald-200",
  B: "bg-amber-50 text-amber-700 border-amber-200",
  C: "bg-rose-50 text-rose-700 border-rose-200",
  certified: "bg-cyan-50 text-cyan-700 border-cyan-200",
  preferred: "bg-emerald-50 text-emerald-700 border-emerald-200",
  standard: "bg-amber-50 text-amber-700 border-amber-200",
  economy: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusIcons = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle,
};

const statusColors = {
  pass: "text-emerald-500",
  warn: "text-amber-500",
  fail: "text-rose-500",
};

export default function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipment = getEquipmentById(id || "");
  const [activeTab, setActiveTab] = useState<"specs" | "inspection" | "finance" | "fingerprint">("specs");
  const [financeTerm, setFinanceTerm] = useState(36);
  const [downPayment, setDownPayment] = useState(10);

  if (!equipment) {
    return (
      <div className="container py-20 text-center">
        <p className="text-ink-500">设备不存在或已下架</p>
        <Link to="/market" className="mt-4 inline-block text-cyan-600">
          返回设备市场
        </Link>
      </div>
    );
  }

  const discount = equipment.originalPrice
    ? Math.round((1 - equipment.price / equipment.originalPrice) * 100)
    : 0;

  // Finance calculation
  const loanAmount = equipment.price * (1 - downPayment / 100);
  const monthlyRate = 0.0065;
  const monthlyPay =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, financeTerm)) /
    (Math.pow(1 + monthlyRate, financeTerm) - 1);
  const totalPay = monthlyPay * financeTerm + equipment.price * (downPayment / 100);

  const tabs = [
    { id: "specs" as const, label: "规格参数", icon: Wrench },
    ...(equipment.inspectionItems ? [{ id: "inspection" as const, label: "质检报告", icon: ShieldCheck }] : []),
    { id: "finance" as const, label: "金融方案", icon: Calculator },
    ...(equipment.fingerprint ? [{ id: "fingerprint" as const, label: "设备指纹", icon: Fingerprint }] : []),
  ];

  return (
    <div className="bg-ink-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ink-100">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <Link to="/" className="hover:text-cyan-600">首页</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/market" className="hover:text-cyan-600">设备市场</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink-900 truncate">{equipment.name}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: image + tabs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Image gallery */}
            <div className="bg-white rounded-xl border border-ink-200 overflow-hidden">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-ink-50 to-ink-100">
                <div className="absolute inset-0 bg-grid opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-6xl font-bold text-ink-300 tracking-tightest">
                      {equipment.brand.slice(0, 3).toUpperCase()}
                    </div>
                    <div className="mt-2 text-xs text-ink-400 tracking-widest">
                      {equipment.model}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span
                    className={cn(
                      "px-2.5 py-1 text-xs font-medium rounded border",
                      conditionStyles[equipment.condition]
                    )}
                  >
                    {equipment.conditionLabel}
                  </span>
                  {equipment.isSelfRun && (
                    <span className="px-2.5 py-1 text-xs font-medium rounded bg-ink-900 text-white">
                      平台自营
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1 text-sm font-mono font-bold rounded bg-rose-500 text-white">
                    省 {discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-ink-200">
              <div className="flex border-b border-ink-100 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                      activeTab === tab.id
                        ? "border-cyan-500 text-cyan-600"
                        : "border-transparent text-ink-500 hover:text-ink-900"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Specs tab */}
                {activeTab === "specs" && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink-900 mb-4">详细规格</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {equipment.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex justify-between py-2 border-b border-ink-50 text-sm"
                        >
                          <span className="text-ink-500">{spec.label}</span>
                          <span className="text-ink-900 font-medium text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-ink-50 rounded-lg">
                      <h4 className="text-xs font-semibold text-ink-900 mb-2">设备描述</h4>
                      <p className="text-sm text-ink-600 leading-relaxed">{equipment.description}</p>
                    </div>
                  </div>
                )}

                {/* Inspection tab */}
                {activeTab === "inspection" && equipment.inspectionItems && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-ink-900">平台质检报告</h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-ink-500">
                          <span>报告编号：<span className="font-mono text-ink-700">{equipment.inspectionReportNo}</span></span>
                          <span>检测日期：{equipment.inspectionDate}</span>
                        </div>
                      </div>
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-md">
                        <div className="text-[10px] text-emerald-600">认证等级</div>
                        <div className="text-sm font-bold text-emerald-700">{equipment.inspectionLevel}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {equipment.inspectionItems.map((item, idx) => {
                        const StatusIcon = statusIcons[item.status];
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-ink-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <StatusIcon className={cn("h-4 w-4", statusColors[item.status])} />
                              <span className="text-sm text-ink-700">{item.name}</span>
                            </div>
                            <span className="text-xs text-ink-500 font-mono">{item.result}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 p-4 bg-cyan-50 border border-cyan-100 rounded-lg flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-cyan-800 leading-relaxed">
                        本设备已通过算力巢平台标准化质检流程，质检报告不可篡改。
                        享受平台 90 天质保与残值担保服务。如设备与报告描述不符，平台先行赔付。
                      </div>
                    </div>
                  </div>
                )}

                {/* Finance tab */}
                {activeTab === "finance" && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink-900 mb-5">金融方案试算</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Calculator */}
                      <div className="p-5 bg-ink-50 rounded-lg space-y-4">
                        <div>
                          <label className="text-xs text-ink-500 mb-2 block">首付比例</label>
                          <input
                            type="range"
                            min={0}
                            max={50}
                            step={5}
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="w-full accent-cyan-500"
                          />
                          <div className="flex justify-between text-xs text-ink-500 mt-1">
                            <span>0%</span>
                            <span className="font-mono font-bold text-cyan-600">{downPayment}%</span>
                            <span>50%</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-ink-500 mb-2 block">分期期数</label>
                          <div className="grid grid-cols-4 gap-2">
                            {[12, 24, 36, 48].map((t) => (
                              <button
                                key={t}
                                onClick={() => setFinanceTerm(t)}
                                className={cn(
                                  "py-2 text-sm rounded-md border transition-colors",
                                  financeTerm === t
                                    ? "border-cyan-300 bg-cyan-50 text-cyan-700 font-medium"
                                    : "border-ink-200 text-ink-600 hover:border-ink-300"
                                )}
                              >
                                {t}期
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Result */}
                      <div className="p-5 bg-ink-900 text-white rounded-lg">
                        <div className="text-xs text-ink-400 mb-1">融资金额</div>
                        <div className="font-mono text-2xl font-bold mb-4">
                          ¥{loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-ink-700">
                          <div>
                            <div className="text-xs text-ink-400">月供</div>
                            <div className="font-mono text-lg font-bold text-cyan-400">
                              ¥{monthlyPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-ink-400">总还款</div>
                            <div className="font-mono text-lg font-bold">
                              ¥{totalPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-ink-400">
                          首付 ¥{(equipment.price * (downPayment / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          ，合作机构：兴业金租 / 招商银行
                        </div>
                      </div>
                    </div>

                    {/* Finance products */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: Landmark, name: "融资租赁", desc: "首付 10%，36 期月租，期满留购" },
                        { icon: CreditCard, name: "分期付款", desc: "3/6/12/24 期灵活分期" },
                        { icon: Repeat, name: "以旧换新", desc: "旧设备估价抵扣新设备款" },
                        { icon: ShieldCheck, name: "残值担保", desc: "期满残值不低于约定比例" },
                      ].map((p) => (
                        <Link
                          key={p.name}
                          to="/finance"
                          className="flex items-center gap-3 p-3 border border-ink-200 rounded-lg hover:border-cyan-300 hover:bg-cyan-50/50 transition-colors"
                        >
                          <div className="p-2 bg-amber-50 rounded-md">
                            <p.icon className="h-4 w-4 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-ink-900">{p.name}</div>
                            <div className="text-xs text-ink-500 truncate">{p.desc}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-ink-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fingerprint tab */}
                {activeTab === "fingerprint" && equipment.fingerprint && (
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <Fingerprint className="h-5 w-5 text-cyan-600" />
                      <h3 className="font-serif text-lg font-bold text-ink-900">设备指纹档案</h3>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-ink-900 to-ink-800 text-white rounded-lg mb-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-ink-400">设备序列号</div>
                          <div className="font-mono text-xl font-bold text-cyan-400 mt-1">
                            {equipment.fingerprint.serial}
                          </div>
                        </div>
                        <Fingerprint className="h-12 w-12 text-cyan-400/30" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "生产日期", value: equipment.fingerprint.manufactureDate, icon: Clock },
                        { label: "使用时长", value: `${equipment.fingerprint.usageHours.toLocaleString()}h`, icon: Clock },
                        { label: "历任机主", value: `${equipment.fingerprint.ownerHistory} 位`, icon: Star },
                        { label: "维修记录", value: `${equipment.fingerprint.maintenanceRecords} 次`, icon: Wrench },
                      ].map((item) => (
                        <div key={item.label} className="p-4 bg-ink-50 rounded-lg">
                          <item.icon className="h-4 w-4 text-ink-400 mb-2" />
                          <div className="text-xs text-ink-500">{item.label}</div>
                          <div className="font-mono text-sm font-bold text-ink-900 mt-1">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 p-4 bg-cyan-50 border border-cyan-100 rounded-lg">
                      <h4 className="text-xs font-semibold text-cyan-900 mb-2">设备全生命周期记录</h4>
                      <div className="space-y-2 text-xs text-cyan-800">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                          <span>2025-04 · 设备出厂，原厂保修开始</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                          <span>2025-05 · 首位机主部署于智算中心</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                          <span>2026-01 · 例行维护，更换散热硅脂</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                          <span>2026-03 · 平台质检认证，上架销售</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: purchase panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-white rounded-xl border border-ink-200 p-6">
                <h1 className="font-serif text-xl font-bold text-ink-900 leading-snug">
                  {equipment.name}
                </h1>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {equipment.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] text-ink-500 bg-ink-50 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 p-4 bg-ink-50 rounded-lg">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-ink-500">¥</span>
                    <span className="font-mono text-3xl font-bold text-ink-900">
                      {equipment.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-ink-500">/{equipment.unit}</span>
                  </div>
                  {equipment.originalPrice && (
                    <div className="mt-1 text-xs text-ink-400 line-through">
                      原价 ¥{equipment.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2.5 text-sm">
                  <div className="flex items-center gap-2 text-ink-600">
                    <MapPin className="h-4 w-4 text-ink-400" />
                    <span>所在地：{equipment.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-600">
                    <Truck className="h-4 w-4 text-ink-400" />
                    <span>交货：{equipment.delivery}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-600">
                    <ShieldCheck className="h-4 w-4 text-ink-400" />
                    <span>库存：{equipment.stock > 0 ? `${equipment.stock} ${equipment.unit}` : "预售锁单"}</span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-ink-900 font-medium rounded-md transition-colors">
                    立即采购
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigate("/finance")}
                      className="py-2.5 border border-ink-200 hover:border-cyan-300 text-sm text-ink-700 rounded-md transition-colors"
                    >
                      融资租赁
                    </button>
                    <button className="py-2.5 border border-ink-200 hover:border-cyan-300 text-sm text-ink-700 rounded-md transition-colors flex items-center justify-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      在线议价
                    </button>
                  </div>
                </div>
              </div>

              {/* Seller card */}
              <Link
                to={`/store/${equipment.sellerId}`}
                className="block bg-white rounded-xl border border-ink-200 p-5 hover:border-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-ink-900 flex items-center justify-center text-white font-serif font-bold">
                    {equipment.sellerName.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-ink-900 truncate">{equipment.sellerName}</span>
                      {equipment.isSelfRun && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-cyan-50 text-cyan-700 rounded">自营</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={cn(
                            "h-3 w-3",
                            s <= 5 ? "text-amber-400 fill-amber-400" : "text-ink-200"
                          )}
                        />
                      ))}
                      <span className="ml-1 text-xs text-ink-500">5.0 信用</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-400" />
                </div>
                <div className="mt-3 pt-3 border-t border-ink-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-ink-400">累计成交</div>
                    <div className="font-mono font-semibold text-ink-900">1,280 单</div>
                  </div>
                  <div>
                    <div className="text-ink-400">在售商品</div>
                    <div className="font-mono font-semibold text-ink-900">28 件</div>
                  </div>
                </div>
              </Link>

              {/* Trust */}
              <div className="bg-white rounded-xl border border-ink-200 p-5">
                <h3 className="text-xs font-semibold text-ink-900 uppercase tracking-wider mb-3">
                  交易保障
                </h3>
                <div className="space-y-2.5">
                  {[
                    { icon: ShieldCheck, text: "担保交易，验收后付款" },
                    { icon: CheckCircle2, text: "平台质检认证，先行赔付" },
                    { icon: Truck, text: "专业物流，专车配送" },
                    { icon: Repeat, text: "7 天无理由（一手设备）" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-ink-600">
                      <item.icon className="h-3.5 w-3.5 text-cyan-500" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
