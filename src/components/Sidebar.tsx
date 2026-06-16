import { Link } from "react-router-dom";
import {
  MessageSquare, PenTool, Image, Video, Music, Code, Briefcase,
  Palette, Search, Bot, Languages, GraduationCap, Megaphone,
  Box, BarChart3, ShoppingCart, ChevronRight, type LucideIcon
} from "lucide-react";
import type { Category } from "@/data/types";

const iconMap: Record<string, LucideIcon> = {
  MessageSquare, PenTool, Image, Video, Music, Code, Briefcase,
  Palette, Search, Bot, Languages, GraduationCap, Megaphone,
  Box, BarChart3, ShoppingCart,
};

interface SidebarProps {
  categories: Category[];
  activeCategoryId: string;
  toolCounts: Record<string, number>;
}

export default function Sidebar({ categories, activeCategoryId, toolCounts }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-3">
          分类目录
        </h3>
        <nav className="space-y-0.5">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || MessageSquare;
            const isActive = category.id === activeCategoryId;
            const count = toolCounts[category.id] || 0;

            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                  isActive
                    ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? category.color : undefined }} />
                <span className="flex-1 truncate">{category.name}</span>
                <span className={`text-xs ${isActive ? "text-accent-cyan/60" : "text-slate-600"}`}>
                  {count}
                </span>
                {isActive && <ChevronRight className="w-3 h-3 text-accent-cyan" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
