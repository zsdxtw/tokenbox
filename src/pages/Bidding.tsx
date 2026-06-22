import { useState } from "react";
import {
  Gavel,
  Users,
  Clock,
  CheckCircle2,
  TrendingDown,
  Plus,
  Trophy,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { biddingProjects, groupBuyProjects } from "@/data/platform";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  bidding: "bg-cyan-50 text-cyan-700 border-cyan-200",
  evaluating: "bg-amber-50 text-amber-700 border-amber-200",
  awarded: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Bidding() {
  const [activeTab, setActiveTab] = useState<"bidding" | "groupBuy">("bidding");

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
                BIDDING & GROUP BUY
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              招标采购与集采拼单
            </h1>
            <p className="mt-4 text-base text-ink-300 leading-relaxed">
              买方发布采购需求，多个卖家竞价报价；或聚合同品类采购需求，向品牌商争取批量折扣。
              支持招标采购、集采拼单、在线议价等多种交易模式。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-ink-900 font-medium rounded-md transition-colors">
                <Plus className="h-4 w-4" />
                发布采购需求
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink-600 hover:border-cyan-400 text-white font-medium rounded-md transition-colors">
                发起集采拼单
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container py-12">
        <div className="flex gap-2 mb-8 border-b border-ink-200">
          <button
            onClick={() => setActiveTab("bidding")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "bidding"
                ? "border-cyan-500 text-cyan-600"
                : "border-transparent text-ink-500 hover:text-ink-900"
            )}
          >
            <Gavel className="h-4 w-4" />
            招标采购
          </button>
          <button
            onClick={() => setActiveTab("groupBuy")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "groupBuy"
                ? "border-cyan-500 text-cyan-600"
                : "border-transparent text-ink-500 hover:text-ink-900"
            )}
          >
            <Users className="h-4 w-4" />
            集采拼单
          </button>
        </div>

        {/* Bidding tab */}
        {activeTab === "bidding" && (
          <div>
            <SectionHeader
              eyebrow="BIDDING PROJECTS"
              title="招标采购项目"
              description="买方发布采购需求单，系统自动匹配符合条件的卖家并推送通知，卖家在竞价周期内提交报价。"
            />

            <div className="space-y-4">
              {biddingProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-ink-200 p-6 card-hover hover:border-cyan-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 text-[10px] font-medium rounded border",
                            statusStyles[project.status]
                          )}
                        >
                          {project.statusLabel}
                        </span>
                        <span className="text-xs text-ink-500">{project.publishDate} 发布</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-ink-900">{project.title}</h3>
                      <p className="mt-2 text-sm text-ink-500 leading-relaxed">{project.description}</p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.requirements.map((req) => (
                          <span
                            key={req}
                            className="px-2 py-0.5 text-[10px] text-ink-600 bg-ink-50 rounded"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-56 shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3">
                      <div className="p-3 bg-ink-50 rounded-lg">
                        <div className="text-[10px] text-ink-500">预算</div>
                        <div className="font-mono text-base font-bold text-ink-900 mt-0.5">
                          {project.budgetLabel}
                        </div>
                      </div>
                      <div className="p-3 bg-ink-50 rounded-lg">
                        <div className="text-[10px] text-ink-500">竞价截止</div>
                        <div className="flex items-center gap-1 text-sm font-medium text-ink-900 mt-0.5">
                          <Clock className="h-3 w-3 text-amber-500" />
                          {project.deadline}
                        </div>
                      </div>
                      <div className="p-3 bg-ink-50 rounded-lg">
                        <div className="text-[10px] text-ink-500">参与竞价</div>
                        <div className="flex items-center gap-1 text-sm font-medium text-ink-900 mt-0.5">
                          <Users className="h-3 w-3 text-cyan-500" />
                          {project.bidderCount} 家卖家
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
                    <span className="text-xs text-ink-500">采购方：{project.buyer}</span>
                    <div className="flex gap-2">
                      {project.status === "bidding" && (
                        <button className="px-4 py-1.5 text-xs font-medium text-white bg-ink-900 hover:bg-cyan-500 hover:text-ink-900 rounded-md transition-colors">
                          参与竞价
                        </button>
                      )}
                      <button className="px-4 py-1.5 text-xs font-medium text-ink-700 border border-ink-200 hover:border-cyan-300 rounded-md transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div className="mt-8 p-5 bg-cyan-50 border border-cyan-100 rounded-xl">
              <h3 className="text-sm font-semibold text-cyan-900 mb-3">招标采购业务规则</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-cyan-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>招标单最低金额 5 万元</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>竞价周期 3-7 天</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>卖家需缴纳保证金（采购金额 2-5%）</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Group buy tab */}
        {activeTab === "groupBuy" && (
          <div>
            <SectionHeader
              eyebrow="GROUP BUY"
              title="集采拼单项目"
              description="系统自动聚合同品类、同型号的采购需求，达到阶梯数量后向品牌商争取批量折扣。"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {groupBuyProjects.map((project) => {
                const progress = Math.round((project.currentQuantity / project.targetQuantity) * 100);
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl border border-ink-200 p-6 card-hover hover:border-cyan-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-base font-bold text-ink-900">{project.title}</h3>
                        <div className="mt-1 text-xs text-ink-500 font-mono">{project.targetModel}</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 rounded">
                        -{project.discount}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-mono text-2xl font-bold text-ink-900">
                        ¥{project.unitPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-ink-400 line-through">
                        ¥{project.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-ink-500">
                          已参团 <span className="font-mono font-semibold text-ink-900">{project.currentQuantity}</span> / {project.targetQuantity}
                        </span>
                        <span className="font-mono text-cyan-600">{progress}%</span>
                      </div>
                      <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Tiers */}
                    <div className="mb-4">
                      <div className="text-[10px] text-ink-500 mb-2">阶梯折扣</div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tiers.map((tier, idx) => {
                          const reached = project.currentQuantity >= tier.quantity;
                          return (
                            <span
                              key={idx}
                              className={cn(
                                "px-2 py-0.5 text-[10px] rounded border",
                                reached
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border-ink-200 text-ink-500"
                              )}
                            >
                              {reached && <TrendingDown className="inline h-2.5 w-2.5 mr-0.5" />}
                              ≥{tier.quantity}：-{tier.discount}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-ink-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.participantCount} 家参团
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          截止 {project.deadline}
                        </span>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-medium text-white bg-ink-900 hover:bg-cyan-500 hover:text-ink-900 rounded-md transition-colors">
                        加入拼单
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rules */}
            <div className="mt-8 p-5 bg-cyan-50 border border-cyan-100 rounded-xl">
              <h3 className="text-sm font-semibold text-cyan-900 mb-3">集采拼单业务规则</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-cyan-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>拼单成功后不可取消</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>折扣力度根据总量阶梯设定</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>平台收取集采服务费 1-2%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Process */}
      <section className="bg-white border-y border-ink-100">
        <div className="container py-16">
          <SectionHeader
            eyebrow="PROCESS"
            title="招标采购流程"
            description="从发布需求到成交签约的标准化招标流程。"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "发布需求", desc: "买方发布采购需求单", icon: Plus },
              { step: "02", title: "系统匹配", desc: "自动匹配符合条件的卖家", icon: Users },
              { step: "03", title: "竞价报价", desc: "卖家在周期内提交报价", icon: Gavel },
              { step: "04", title: "选择中标", desc: "买方选择中标卖家", icon: Trophy },
              { step: "05", title: "签约成交", desc: "托管保证金，签约成交", icon: CheckCircle2 },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div className="font-mono text-xs text-ink-400">{item.step}</div>
                </div>
                <h4 className="font-serif text-sm font-bold text-ink-900">{item.title}</h4>
                <p className="mt-1 text-xs text-ink-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
