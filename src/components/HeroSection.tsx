import { Search, Sparkles, Zap } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hotTags: string[];
}

export default function HeroSection({ searchQuery, onSearchChange, hotTags }: HeroSectionProps) {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-accent-cyan mb-6 animate-fade-in">
            <Zap className="w-3 h-3" />
            <span>已收录 60+ AI工具，持续更新中</span>
          </div>

          {/* Title */}
          <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-up">
            发现最佳
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple text-glow">
              AI工具
            </span>
          </h1>

          <p className="text-slate-400 text-lg mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            一站式AI导航，帮你快速找到适合的AI平台
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="glow-border rounded-2xl">
              <div className="relative flex items-center glass rounded-2xl">
                <Search className="absolute left-5 w-5 h-5 text-accent-cyan" />
                <input
                  type="text"
                  placeholder="输入关键词搜索AI工具，如：ChatGPT、AI绘画、代码助手..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-14 pr-32 py-4 bg-transparent text-base text-slate-200 placeholder-slate-500 focus:outline-none rounded-2xl"
                />
                <button className="absolute right-3 px-5 py-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-primary font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  搜索
                </button>
              </div>
            </div>
          </div>

          {/* Hot tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="text-xs text-slate-500">热门：</span>
            {hotTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className="px-3 py-1 rounded-full text-xs text-slate-300 border border-white/10 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
