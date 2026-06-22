import { useState } from "react";
import {
  Newspaper,
  Clock,
  ChevronRight,
  Flame,
  Calendar,
  Building,
  TrendingUp,
  X,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { policyArticles, policyCategories, type PolicyCategory } from "@/data/policy";
import { cn } from "@/lib/utils";

const categoryStyles: Record<string, string> = {
  政府政策: "bg-rose-50 text-rose-700 border-rose-200",
  行业规范: "bg-amber-50 text-amber-700 border-amber-200",
  企业动态: "bg-cyan-50 text-cyan-700 border-cyan-200",
  技术标准: "bg-emerald-50 text-emerald-700 border-emerald-200",
  市场分析: "bg-ink-100 text-ink-700 border-ink-200",
};

export default function PolicyNews() {
  const [activeCategory, setActiveCategory] = useState<PolicyCategory | "all">("all");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const filteredArticles =
    activeCategory === "all"
      ? policyArticles
      : policyArticles.filter((a) => a.category === activeCategory);

  const hotArticles = policyArticles.filter((a) => a.isHot);
  const selected = policyArticles.find((a) => a.id === selectedArticle);

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
                POLICY & NEWS
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              政策资讯
            </h1>
            <p className="mt-4 text-base text-ink-300 leading-relaxed">
              聚焦人工智能、算力设备、智算中心领域的最新政府政策、行业规范、企业动态、
              技术标准与市场分析，为算力产业链决策提供信息支持。
            </p>
          </div>
        </div>
      </section>

      {/* Hot articles banner */}
      {hotArticles.length > 0 && (
        <section className="bg-white border-b border-ink-100">
          <div className="container py-6">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-semibold text-ink-900 uppercase tracking-wider">
                热门资讯
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hotArticles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article.id)}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full text-xs text-rose-700 transition-colors"
                >
                  <Flame className="h-3 w-3" />
                  <span className="max-w-xs truncate group-hover:text-rose-900">
                    {article.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-xl border border-ink-200 p-5">
                <h3 className="font-serif text-base font-bold text-ink-900 mb-4">资讯分类</h3>
                <div className="flex flex-col gap-1.5">
                  {policyCategories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      className={cn(
                        "text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between",
                        activeCategory === cat.value
                          ? "bg-cyan-50 text-cyan-700 font-medium"
                          : "text-ink-600 hover:bg-ink-50"
                      )}
                    >
                      <span>{cat.label}</span>
                      <span className="text-xs text-ink-400 font-mono">
                        {cat.value === "all"
                          ? policyArticles.length
                          : policyArticles.filter((a) => a.category === cat.value).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-ink-900 text-white rounded-xl p-5">
                <h3 className="font-serif text-sm font-bold mb-4">资讯概览</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-ink-700">
                    <span className="text-xs text-ink-400">资讯总数</span>
                    <span className="font-mono text-lg font-bold">{policyArticles.length}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-ink-700">
                    <span className="text-xs text-ink-400">本月更新</span>
                    <span className="font-mono text-lg font-bold text-cyan-400">
                      {policyArticles.filter((a) => a.publishDate.startsWith("2026-03")).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-400">热门资讯</span>
                    <span className="font-mono text-lg font-bold text-amber-400">
                      {hotArticles.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Article list */}
          <div className="lg:col-span-3">
            <SectionHeader
              eyebrow="LATEST"
              title={activeCategory === "all" ? "全部资讯" : activeCategory}
              description={`共 ${filteredArticles.length} 篇资讯`}
            />

            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article.id)}
                  className="group cursor-pointer p-6 bg-white rounded-xl border border-ink-200 card-hover hover:border-cyan-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-medium rounded border",
                        categoryStyles[article.category]
                      )}
                    >
                      {article.category}
                    </span>
                    {article.isHot && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-rose-600 bg-rose-50 rounded">
                        <Flame className="h-2.5 w-2.5" />
                        热门
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[10px] text-ink-400">
                      <Calendar className="h-3 w-3" />
                      {article.publishDate}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-ink-900 leading-snug group-hover:text-cyan-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-ink-400">
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {article.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-cyan-600 group-hover:text-cyan-700">
                      阅读全文
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 text-[10px] text-ink-500 bg-ink-50 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="bg-white rounded-xl border border-ink-200 p-16 text-center">
                <Newspaper className="h-10 w-10 text-ink-300 mx-auto mb-3" />
                <p className="text-sm text-ink-500">该分类下暂无资讯</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          />
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-ink-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-medium rounded border",
                      categoryStyles[selected.category]
                    )}
                  >
                    {selected.category}
                  </span>
                  {selected.isHot && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-rose-600 bg-rose-50 rounded">
                      <Flame className="h-2.5 w-2.5" />
                      热门
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1 text-ink-400 hover:text-ink-700 shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h2 className="mt-3 font-serif text-xl font-bold text-ink-900 leading-snug">
                {selected.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 text-xs text-ink-500">
                <span className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {selected.source}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {selected.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {selected.readTime}阅读
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <div className="p-4 bg-cyan-50/50 rounded-lg mb-4">
                <p className="text-sm text-ink-700 leading-relaxed font-medium">
                  {selected.summary}
                </p>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed whitespace-pre-line">
                {selected.content}
              </p>

              <div className="mt-6 pt-4 border-t border-ink-100">
                <div className="text-xs text-ink-500 mb-2">相关标签</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs text-cyan-700 bg-cyan-50 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-ink-100 bg-ink-50 flex items-center justify-between">
              <span className="text-xs text-ink-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                算力巢政策资讯中心
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 text-xs font-medium text-white bg-ink-900 hover:bg-cyan-500 hover:text-ink-900 rounded-md transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
