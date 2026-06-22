import { useState } from "react";
import {
  Server,
  Leaf,
  Cpu,
  RefreshCw,
  Landmark,
  Activity,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  Building2,
  Clock,
  Trophy,
  ChevronRight,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { solutionScenarios, solutionCases } from "@/data/solutions";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Leaf,
  Cpu,
  RefreshCw,
  Landmark,
  Activity,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  基础设施建设: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", dot: "bg-cyan-500" },
  绿色低碳: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500" },
  算力运营: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-500" },
  资产处置: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", dot: "bg-rose-500" },
  金融服务: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-500" },
  运维管理: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", dot: "bg-cyan-500" },
};

export default function Solutions() {
  const [activeScenario, setActiveScenario] = useState(solutionScenarios[0]);
  const [activeCase, setActiveCase] = useState<string | null>(null);

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
                SOLUTIONS
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              行业解决方案
            </h1>
            <p className="mt-4 text-base text-ink-300 leading-relaxed">
              算力巢自营的综合解决方案，覆盖算力集群中心建设、绿色供电、算力租赁运营、
              二手设备残值处置、融资租赁采购、全生命周期管理等场景。
              用户可根据自身需求查看与选择对应的解决方案，配套真实落地案例。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-ink-800 border border-ink-700 rounded-md text-sm">
                <span className="text-ink-400">自营内容：</span>
                <span className="text-cyan-400">算力巢专家团队设计</span>
              </div>
              <div className="px-4 py-2 bg-ink-800 border border-ink-700 rounded-md text-sm">
                <span className="text-ink-400">已落地：</span>
                <span className="text-amber-400">{solutionCases.length} 个案例</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios grid */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="SCENARIOS"
          title="六大解决方案场景"
          description="针对算力产业链不同环节的痛点，提供端到端的综合解决方案。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutionScenarios.map((scenario) => {
            const Icon = iconMap[scenario.icon];
            const c = categoryColors[scenario.category] || categoryColors["基础设施建设"];
            const isActive = activeScenario.id === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setActiveScenario(scenario);
                  document.getElementById("scenario-detail")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={cn(
                  "group text-left p-6 bg-white rounded-xl border-2 transition-all card-hover",
                  isActive ? "border-cyan-400 shadow-md" : "border-ink-200 hover:border-cyan-300"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-lg border", c.bg, c.border)}>
                    {Icon && <Icon className={cn("h-6 w-6", c.text)} />}
                  </div>
                  <span className={cn("text-[10px] font-mono uppercase tracking-widest", c.text)}>
                    {scenario.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-ink-900 mb-1">{scenario.name}</h3>
                <p className={cn("text-xs font-medium mb-3", c.text)}>{scenario.tagline}</p>
                <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-3">
                  {scenario.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scenario.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className={cn("px-2 py-0.5 text-[10px] rounded", c.bg, c.text)}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-ink-500">
                    <Clock className="h-3 w-3" />
                    {scenario.duration}
                  </span>
                  <span className={cn("flex items-center gap-1 font-medium", c.text)}>
                    查看详情
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Scenario detail */}
      <section id="scenario-detail" className="bg-white border-y border-ink-100">
        <div className="container py-20">
          {(() => {
            const scenario = activeScenario;
            const Icon = iconMap[scenario.icon];
            const c = categoryColors[scenario.category] || categoryColors["基础设施建设"];
            return (
              <div>
                <SectionHeader
                  eyebrow="DETAIL"
                  title={scenario.name}
                  description={scenario.description}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Service scope */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 bg-ink-50 rounded-xl">
                      <h3 className="font-serif text-base font-bold text-ink-900 mb-4 flex items-center gap-2">
                        <span className={cn("h-4 w-1 rounded", c.dot)} />
                        服务范围
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {scenario.scope.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0", c.bg, c.text)}>
                              {idx + 1}
                            </div>
                            <span className="text-sm text-ink-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-ink-50 rounded-xl">
                      <h3 className="font-serif text-base font-bold text-ink-900 mb-4 flex items-center gap-2">
                        <span className={cn("h-4 w-1 rounded", c.dot)} />
                        交付物
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {scenario.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-ink-700">
                            <CheckCircle2 className={cn("h-4 w-4 shrink-0", c.text)} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-4">
                    <div className={cn("p-6 rounded-xl border", c.border, c.bg)}>
                      <div className="flex items-center gap-3 mb-4">
                        {Icon && <Icon className={cn("h-8 w-8", c.text)} />}
                        <div>
                          <div className="text-xs text-ink-500">{scenario.category}</div>
                          <div className={cn("text-sm font-medium", c.text)}>{scenario.tagline}</div>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between pb-2 border-b border-ink-200/50">
                          <span className="text-ink-500">交付周期</span>
                          <span className="font-medium text-ink-900">{scenario.duration}</span>
                        </div>
                        <div>
                          <div className="text-ink-500 mb-2">方案亮点</div>
                          <div className="flex flex-wrap gap-1.5">
                            {scenario.highlights.map((h) => (
                              <span
                                key={h}
                                className="px-2 py-0.5 text-[10px] bg-white rounded text-ink-700"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-ink-200">
                      <h4 className="text-xs font-semibold text-ink-900 uppercase tracking-wider mb-3">
                        合作伙伴
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {scenario.partners.map((p) => (
                          <span
                            key={p}
                            className="px-2.5 py-1 text-xs text-ink-700 bg-ink-50 rounded-md"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-ink-900 hover:bg-cyan-500 hover:text-ink-900 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2">
                      咨询方案
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Cases */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="CASES"
          title="落地案例"
          description="算力巢解决方案的真实落地案例，覆盖政府、企业、高校等多类客户。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solutionCases.map((caseItem) => {
            const isExpanded = activeCase === caseItem.id;
            return (
              <div
                key={caseItem.id}
                className="p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-cyan-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-medium text-cyan-700 bg-cyan-50 rounded">
                      {caseItem.scenario}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] text-ink-500 bg-ink-50 rounded">
                      {caseItem.industry}
                    </span>
                  </div>
                  <Trophy className="h-4 w-4 text-amber-400 shrink-0" />
                </div>

                <h3 className="font-serif text-lg font-bold text-ink-900 leading-snug mb-2">
                  {caseItem.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed mb-4">{caseItem.summary}</p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {caseItem.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {caseItem.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {caseItem.completionDate}
                  </span>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {caseItem.results.map((r) => (
                    <div key={r.label} className="p-2.5 bg-ink-50 rounded-lg text-center">
                      <div className="font-mono text-sm font-bold text-ink-900">{r.value}</div>
                      <div className="text-[10px] text-ink-500 mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] text-ink-500 bg-ink-50 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
                  <span className="text-xs text-ink-500">项目规模：{caseItem.scale}</span>
                  <button
                    onClick={() => setActiveCase(isExpanded ? null : caseItem.id)}
                    className="flex items-center gap-1 text-xs font-medium text-cyan-600 hover:text-cyan-700"
                  >
                    {isExpanded ? "收起" : "查看详情"}
                    <ChevronRight className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-90")} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 p-4 bg-cyan-50/50 rounded-lg">
                    <h4 className="text-xs font-semibold text-ink-900 mb-2">案例详情</h4>
                    <p className="text-xs text-ink-600 leading-relaxed">{caseItem.summary}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {caseItem.results.map((r) => (
                        <div key={r.label} className="flex items-center justify-between text-xs">
                          <span className="text-ink-500">{r.label}</span>
                          <span className="font-mono font-semibold text-cyan-700">{r.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
                  找不到合适的解决方案？
                </h2>
                <p className="mt-2 text-sm text-ink-400">
                  算力巢专家团队可为您定制专属方案，覆盖算力设备全生命周期。
                </p>
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-ink-900 font-medium rounded-md transition-colors shrink-0">
                预约专家咨询
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
