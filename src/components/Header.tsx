import { Link } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-orbitron font-bold text-lg text-white tracking-wider">
            AI<span className="text-accent-cyan">NAV</span>
          </span>
        </Link>

        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索AI工具..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-primary-50 border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/30 transition-all"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-slate-300 hover:text-accent-cyan transition-colors">
            首页
          </Link>
          <a href="#categories" className="text-slate-300 hover:text-accent-cyan transition-colors">
            分类
          </a>
          <a href="#hot" className="text-slate-300 hover:text-accent-cyan transition-colors">
            热门
          </a>
        </nav>
      </div>
    </header>
  );
}
