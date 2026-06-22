import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "首页", path: "/" },
  { label: "设备市场", path: "/market" },
  { label: "金融服务", path: "/finance" },
  { label: "增值服务", path: "/services" },
  { label: "算力交易", path: "/compute" },
  { label: "价格指数", path: "/price-index" },
  { label: "招标集采", path: "/bidding" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/market");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/80 bg-white/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative h-9 w-9 rounded-lg bg-ink-900 flex items-center justify-center">
            <div className="absolute inset-1 rounded-md border border-cyan-400/60" />
            <div className="absolute inset-2 rounded-sm border border-cyan-400/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold text-ink-900 tracking-tight">算力巢</span>
            <span className="text-[10px] text-ink-500 tracking-widest">COMPUTE NEST</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-cyan-600 bg-cyan-50"
                    : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
                )
              }
              end={item.path === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Search + Actions */}
        <div className="hidden md:flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              placeholder="搜索 H100 / A100 / 交换机..."
              className="w-56 lg:w-64 pl-9 pr-3 py-2 text-sm rounded-md border border-ink-200 bg-ink-50/50 focus:bg-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 transition-all"
            />
          </form>
          <button className="px-4 py-2 text-sm font-medium text-white bg-ink-900 rounded-md hover:bg-ink-800 transition-colors">
            登录 / 注册
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-ink-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-200 bg-white">
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md",
                    isActive
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-ink-700 hover:bg-ink-50"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-2">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-ink-900 rounded-md">
                登录 / 注册
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
