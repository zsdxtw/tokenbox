import { ExternalLink, Flame, Sparkles } from "lucide-react";
import type { Tool } from "@/data/types";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const pricingLabel: Record<string, { text: string; className: string }> = {
    free: { text: "免费", className: "tag-free" },
    freemium: { text: "免费增值", className: "tag-freemium" },
    paid: { text: "付费", className: "tag-paid" },
  };

  const pricing = pricingLabel[tool.pricing];

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-xl p-4 flex items-start gap-4 transition-all duration-300 glass-hover card-glow animate-slide-up"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {/* Logo */}
      <div className="w-12 h-12 rounded-xl bg-primary-50 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-accent-cyan/30 transition-colors">
        <img
          src={tool.logo}
          alt={tool.name}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg font-bold text-accent-cyan">${tool.name[0]}</span>`;
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-white truncate group-hover:text-accent-cyan transition-colors">
            {tool.name}
          </h3>
          {tool.isHot && (
            <span className="tag-hot inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium">
              <Flame className="w-2.5 h-2.5" />
              热门
            </span>
          )}
          {tool.isNew && (
            <span className="tag-new inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium">
              <Sparkles className="w-2.5 h-2.5" />
              NEW
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 mb-2">{tool.description}</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          {pricing && (
            <span className={`${pricing.className} px-1.5 py-0.5 rounded text-[10px] font-medium`}>
              {pricing.text}
            </span>
          )}
          {tool.tags.filter(t => !["免费", "付费"].includes(t)).slice(0, 2).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] text-slate-500 bg-white/5 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-accent-cyan transition-colors shrink-0 mt-1" />
    </a>
  );
}
