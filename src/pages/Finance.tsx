import { useState } from "react";
import {
  Landmark,
  CreditCard,
  Repeat,
  Building2,
  ShieldCheck,
  TrendingUp,
  Calculator,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { financeProducts, financePartners } from "@/data/finance";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  CreditCard,
  Repeat,
  Building2,
  ShieldCheck,
  TrendingUp,
};

export default function Finance() {
  const [price, setPrice] = useState(2850000);
  const [downPayment, setDownPayment] = useState(10);
  const [term, setTerm] = useState(36);

  const loanAmount = price * (1 - downPayment / 100);
  const monthlyRate = 0.0065;
  const monthlyPay =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);
  const totalPay = monthlyPay * term + price * (downPayment / 100);
  const residualValue = price * 0.35;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero - 清新浅色背景 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-white border-b border-ink-100">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] glow-amber opacity-50" />
        <div className="container relative py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-amber-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600">
                FINANCIAL SERVICES
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900">
              金融服务板块
            </h1>
            <p className="mt-4 text-base text-ink-500 leading-relaxed">
              连接金融机构与设备买卖方的金融产品超市。算力设备单价高（8 卡 H100 整机 200-400 万元），
              金融服务是降低采购门槛、放大交易规模的关键杠杆。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white border border-ink-200 rounded-lg text-sm shadow-soft">
                <span className="text-ink-500">租赁物范围：</span>
                <span className="text-brand-600">算力中心设备已纳入鼓励发展</span>
              </div>
              <div className="px-4 py-2 bg-white border border-ink-200 rounded-lg text-sm shadow-soft">
                <span className="text-ink-500">参考案例：</span>
                <span className="text-amber-600">兴业金租 5 亿元 GPU 融资租赁</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product matrix */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="PRODUCT MATRIX"
          title="六大金融产品"
          description="联合金租公司、商业银行、保险公司，提供覆盖设备全生命周期的金融产品矩阵。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {financeProducts.map((product) => {
            const Icon = iconMap[product.icon];
            return (
              <div
                key={product.id}
                className="group p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-amber-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    {Icon && <Icon className="h-6 w-6 text-amber-600" />}
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono text-amber-700 bg-amber-50 rounded">
                    {product.rate}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-ink-900">{product.name}</h3>
                <p className="mt-1 text-xs text-amber-600 font-medium">{product.tagline}</p>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed flex-1">
                  {product.description}
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="text-ink-400 shrink-0 w-16">合作机构</span>
                    <span className="text-ink-700">{product.partner}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-ink-400 shrink-0 w-16">典型方案</span>
                    <span className="text-ink-700">{product.typicalPlan}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-ink-400 shrink-0 w-16">平台角色</span>
                    <span className="text-ink-700">{product.platformRole}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-ink-400 shrink-0 w-16">收益模式</span>
                    <span className="text-amber-600 font-medium">{product.revenue}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-ink-100 flex flex-wrap gap-1.5">
                  {product.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2 py-0.5 text-[10px] text-amber-700 bg-amber-50 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-ink-50/50 border-y border-ink-100">
        <div className="container py-20">
          <SectionHeader
            eyebrow="CALCULATOR"
            title="融资方案试算"
            description="输入设备价格、首付比例与分期期数，实时计算融资租赁月供与总还款。"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="p-6 bg-white rounded-xl border border-ink-200 shadow-soft space-y-6">
              <div>
                <label className="text-sm font-medium text-ink-700 mb-3 block">设备价格</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={100000}
                    max={5000000}
                    step={50000}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="flex-1 accent-amber-500"
                  />
                  <div className="font-mono text-lg font-bold text-ink-900 w-32 text-right">
                    ¥{price.toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-ink-400 mt-1">
                  <span>10 万</span>
                  <span>500 万</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-ink-700 mb-3 block">首付比例</label>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 10, 20, 30, 50].map((r) => (
                    <button
                      key={r}
                      onClick={() => setDownPayment(r)}
                      className={cn(
                        "py-2 text-sm rounded-md border transition-colors",
                        downPayment === r
                          ? "border-amber-300 bg-amber-50 text-amber-700 font-medium"
                          : "border-ink-200 text-ink-600 hover:border-ink-300"
                      )}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-ink-700 mb-3 block">分期期数</label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTerm(t)}
                      className={cn(
                        "py-2 text-sm rounded-md border transition-colors",
                        term === t
                          ? "border-amber-300 bg-amber-50 text-amber-700 font-medium"
                          : "border-ink-200 text-ink-600 hover:border-ink-300"
                      )}
                    >
                      {t} 期
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="p-6 bg-gradient-to-br from-ink-900 to-ink-800 text-white rounded-xl">
              <div className="flex items-center gap-2 mb-5">
                <Calculator className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-bold">融资租赁方案</h3>
              </div>

              <div className="space-y-4">
                <div className="pb-4 border-b border-ink-700">
                  <div className="text-xs text-ink-400">融资金额</div>
                  <div className="font-mono text-3xl font-bold text-amber-400 mt-1">
                    ¥{loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-ink-800/50 rounded-lg border border-ink-700">
                    <div className="text-xs text-ink-400">月租金</div>
                    <div className="font-mono text-xl font-bold text-white mt-1">
                      ¥{monthlyPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="p-3 bg-ink-800/50 rounded-lg border border-ink-700">
                    <div className="text-xs text-ink-400">首付金额</div>
                    <div className="font-mono text-xl font-bold text-white mt-1">
                      ¥{(price * (downPayment / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-ink-800/50 rounded-lg border border-ink-700">
                    <div className="text-xs text-ink-400">总还款额</div>
                    <div className="font-mono text-lg font-bold text-white mt-1">
                      ¥{totalPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="p-3 bg-ink-800/50 rounded-lg border border-ink-700">
                    <div className="text-xs text-ink-400">3 年后残值担保</div>
                    <div className="font-mono text-lg font-bold text-brand-400 mt-1">
                      ¥{residualValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 text-xs text-ink-400 leading-relaxed">
                  ※ 估算结果仅供参考，实际利率与方案以金融机构审批为准。
                  平台提供残值担保，承诺 3 年后残值不低于原价 35%。
                </div>

                <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-ink-900 font-medium rounded-lg transition-colors">
                  申请融资租赁
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="PARTNERS"
          title="合作金融机构"
          description="联合国内主流金租公司、商业银行与保险公司，构建算力设备金融生态。"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {financePartners.map((group) => (
            <div key={group.type} className="p-6 bg-white rounded-xl border border-ink-200 shadow-soft">
              <h3 className="text-base font-bold text-ink-900 mb-4">{group.type}</h3>
              <div className="grid grid-cols-2 gap-3">
                {group.names.map((name) => (
                  <div
                    key={name}
                    className="flex items-center justify-center h-16 px-3 bg-ink-50 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-ink-700 text-center">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink-50/50 border-t border-ink-100">
        <div className="container py-20">
          <SectionHeader
            eyebrow="PROCESS"
            title="金融服务交易流程"
            description="从选购设备到期满处置的全流程金融服务。"
          />

          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-ink-200" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: "01", title: "选购设备", desc: "买方在平台选购设备" },
                { step: "02", title: "选择方案", desc: "选择金融方案并提交资质材料" },
                { step: "03", title: "风控审批", desc: "平台+金融机构联合风控审批" },
                { step: "04", title: "按期还款", desc: "签署合同，平台发货，按期还款" },
                { step: "05", title: "期满处置", desc: "留购/续租/退还平台回收" },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="hidden md:flex h-12 w-12 rounded-full bg-white border-2 border-amber-300 items-center justify-center font-mono font-bold text-amber-600 mb-4 shadow-soft">
                    {item.step}
                  </div>
                  <h4 className="text-sm font-bold text-ink-900">{item.title}</h4>
                  <p className="mt-1 text-xs text-ink-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
