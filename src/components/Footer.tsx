import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white tracking-wider">
              AI<span className="text-accent-cyan">NAV</span>
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/" className="hover:text-accent-cyan transition-colors">首页</Link>
            <a href="#categories" className="hover:text-accent-cyan transition-colors">分类</a>
            <a href="#hot" className="hover:text-accent-cyan transition-colors">热门</a>
          </nav>

          <p className="text-xs text-slate-600">
            &copy; 2026 AINAV. AI工具导航，发现最佳AI平台
          </p>
        </div>
      </div>
    </footer>
  );
}
