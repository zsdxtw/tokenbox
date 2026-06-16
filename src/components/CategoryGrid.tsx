import { Link } from "react-router-dom";
import {
  MessageSquare, PenTool, Image, Video, Music, Code, Briefcase,
  Palette, Search, Bot, Languages, GraduationCap, Megaphone,
  Box, BarChart3, ShoppingCart, type LucideIcon
} from "lucide-react";
import type { Category } from "@/data/types";

const iconMap: Record<string, LucideIcon> = {
  MessageSquare, PenTool, Image, Video, Music, Code, Briefcase,
  Palette, Search, Bot, Languages, GraduationCap, Megaphone,
  Box, BarChart3, ShoppingCart,
};

interface CategoryGridProps {
  categories: Category[];
  toolCounts: Record<string, number>;
}

export default function CategoryGrid({ categories, toolCounts }: CategoryGridProps) {
  return (
    <section id="categories" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent-cyan to-accent-purple" />
          <h2 className="text-xl font-bold text-white">AI分类导航</h2>
          <span className="text-xs text-slate-500">{categories.length}个分类</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || MessageSquare;
            const count = toolCounts[category.id] || 0;
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group glass rounded-xl p-4 text-center transition-all duration-300 glass-hover card-glow animate-slide-up"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: category.color }} />
                </div>
                <h3 className="text-sm font-medium text-white mb-1">{category.name}</h3>
                <span className="text-xs text-slate-500">{count}个工具</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
