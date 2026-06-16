import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MessageSquare, PenTool, Image, Video, Music, Code, Briefcase,
  Palette, Search, Bot, Languages, GraduationCap, Megaphone,
  Box, BarChart3, ShoppingCart, ChevronDown, type LucideIcon
} from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ToolGrid from "@/components/ToolGrid";
import Footer from "@/components/Footer";
import categoriesData from "@/data/categories.json";
import toolsData from "@/data/tools.json";
import type { Category, Tool } from "@/data/types";

const iconMap: Record<string, LucideIcon> = {
  MessageSquare, PenTool, Image, Video, Music, Code, Briefcase,
  Palette, Search, Bot, Languages, GraduationCap, Megaphone,
  Box, BarChart3, ShoppingCart,
};

const categories = categoriesData as Category[];
const tools = toolsData as Tool[];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("order");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentCategory = categories.find((c) => c.slug === slug);

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tools.forEach((tool) => {
      counts[tool.categoryId] = (counts[tool.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const categoryTools = useMemo(() => {
    if (!currentCategory) return [];
    let filtered = tools.filter((t) => t.categoryId === currentCategory.id);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "hot":
        sorted.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
        break;
      case "new":
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "free":
        sorted.sort((a, b) => {
          const order = { free: 0, freemium: 1, paid: 2 };
          return order[a.pricing] - order[b.pricing];
        });
        break;
      default:
        sorted.sort((a, b) => a.order - b.order);
    }

    return sorted;
  }, [currentCategory, searchQuery, sortBy]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-400 mb-4">分类不存在</p>
            <Link to="/" className="text-accent-cyan hover:underline">返回首页</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[currentCategory.icon] || MessageSquare;

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link to="/" className="hover:text-accent-cyan transition-colors">首页</Link>
            <span>/</span>
            <span className="text-white">{currentCategory.name}</span>
          </nav>

          {/* Category header */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: `${currentCategory.color}15`, border: `1px solid ${currentCategory.color}30` }}
            >
              <Icon className="w-7 h-7" style={{ color: currentCategory.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{currentCategory.name}</h1>
              <p className="text-sm text-slate-400 mt-1">{currentCategory.description}</p>
            </div>
          </div>

          {/* Mobile category menu */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-slate-300 w-full"
            >
              <span>切换分类</span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileMenuOpen && (
              <div className="mt-2 glass rounded-lg p-2 space-y-0.5">
                {categories.map((cat) => {
                  const CatIcon = iconMap[cat.icon] || MessageSquare;
                  return (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        cat.id === currentCategory.id
                          ? "bg-accent-cyan/10 text-accent-cyan"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <CatIcon className="w-4 h-4" />
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Subcategory filter */}
          {currentCategory.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                全部
              </button>
              {currentCategory.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 border border-white/10 hover:border-accent-cyan/30 hover:text-accent-cyan transition-all"
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="flex gap-8">
            <Sidebar
              categories={categories}
              activeCategoryId={currentCategory.id}
              toolCounts={toolCounts}
            />
            <div className="flex-1">
              <ToolGrid
                tools={categoryTools}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
