import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import HotTools from "@/components/HotTools";
import NewTools from "@/components/NewTools";
import Footer from "@/components/Footer";
import categoriesData from "@/data/categories.json";
import toolsData from "@/data/tools.json";
import type { Category, Tool } from "@/data/types";

const categories = categoriesData as Category[];
const tools = toolsData as Tool[];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const hotTags = ["ChatGPT", "AI绘画", "DeepSeek", "AI编程", "AI视频", "AI搜索"];

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tools.forEach((tool) => {
      counts[tool.categoryId] = (counts[tool.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const hotTools = useMemo(() => tools.filter((t) => t.isHot), []);
  const newTools = useMemo(() => tools.filter((t) => t.isNew), []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {searchQuery.trim() ? (
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-medium text-white mb-6">
              搜索 "<span className="text-accent-cyan">{searchQuery}</span>" 的结果
              <span className="text-sm text-slate-500 ml-2">{searchResults?.length || 0} 个工具</span>
            </h2>
            {searchResults && searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {searchResults.map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={tool.url}
                    target="_blank"
                    className="glass rounded-xl p-4 flex items-start gap-4 transition-all duration-300 glass-hover card-glow animate-slide-up"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-50 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={tool.logo} alt={tool.name} className="w-8 h-8 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">{tool.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{tool.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500">未找到匹配的AI工具</p>
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="flex-1">
          <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} hotTags={hotTags} />
          <CategoryGrid categories={categories} toolCounts={toolCounts} />
          <HotTools tools={hotTools} />
          <NewTools tools={newTools} />
        </main>
      )}

      <Footer />
    </div>
  );
}
