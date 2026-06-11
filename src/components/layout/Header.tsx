import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Phone, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore, roleLabels } from '@/store/useAuthStore';

const navLinks = [
  { label: '首页', path: '/' },
  { label: 'AI算力馆', path: '/ai-computing' },
  { label: '二手交易', path: '/secondhand' },
  { label: '电力设备', path: '/power' },
  { label: '网络设备', path: '/network' },
  { label: '散热方案', path: '/cooling' },
  { label: '品牌中心', path: '/brands' },
  { label: '行情资讯', path: '/market' },
  { label: '解决方案', path: '/solutions' },
  { label: '金融服务', path: '/finance' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const itemCount = useCartStore((s) => s.getItemCount());
  const { user, isLoggedIn, logout } = useAuthStore();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/ai-computing?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nest-surface/80 backdrop-blur-xl border-b border-nest-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span
            className="font-display text-2xl font-bold text-nest-blue"
            style={{ textShadow: '0 0 12px rgba(0,212,255,0.4)' }}
          >
            算力巢
          </span>
          <span className="font-display text-xs text-nest-muted tracking-wider hidden sm:inline">
            PowerNest
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.path) ? 'text-nest-blue' : 'text-nest-text hover:text-nest-blue'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-nest-blue rounded-full"
                  style={{ boxShadow: '0 0 8px rgba(0,212,255,0.6)' }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-nest-card border border-nest-blue rounded-lg overflow-hidden shadow-glow-blue">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="搜索设备..."
                  className="w-40 px-3 py-1.5 bg-transparent text-sm text-nest-text placeholder-nest-muted outline-none"
                  autoFocus
                />
                <button onClick={handleSearch} className="px-3 py-1.5 text-nest-blue hover:text-nest-blue-dark">
                  <Search size={16} />
                </button>
                <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="px-2 py-1.5 text-nest-muted hover:text-nest-text">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-nest-muted hover:text-nest-blue transition-colors" aria-label="搜索">
                <Search size={20} />
              </button>
            )}
          </div>

          {/* User */}
          {isLoggedIn && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm text-nest-text hover:text-nest-blue transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-nest-blue to-nest-blue-dark flex items-center justify-center text-xs font-bold text-nest-bg">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
                <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-nest-card border border-nest-border rounded-lg shadow-card overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-nest-border">
                      <p className="text-sm font-medium text-nest-text">{user.name}</p>
                      <p className="text-xs text-nest-muted mt-0.5">{roleLabels[user.role]}</p>
                    </div>
                    <div className="py-1">
                      <Link to="/user" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-nest-text hover:bg-nest-surface transition-colors">个人中心</Link>
                      <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-nest-text hover:bg-nest-surface transition-colors">我的订单</Link>
                      <Link to="/cart" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-nest-text hover:bg-nest-surface transition-colors">购物车</Link>
                    </div>
                    <div className="border-t border-nest-border py-1">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-nest-red hover:bg-nest-surface transition-colors flex items-center gap-2">
                        <LogOut size={14} /> 退出登录
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 text-sm text-nest-muted hover:text-nest-blue transition-colors">
              <User size={18} />
              <span className="hidden sm:inline">登录/注册</span>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative text-nest-muted hover:text-nest-blue transition-colors">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-nest-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

          {/* Phone */}
          <div className="hidden md:flex items-center gap-1 text-sm text-nest-muted">
            <Phone size={14} />
            <span>400-888-8888</span>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-nest-muted hover:text-nest-blue transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-nest-surface border-b border-nest-border"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm rounded transition-colors ${
                    isActive(link.path)
                      ? 'text-nest-blue bg-nest-blue/10'
                      : 'text-nest-text hover:text-nest-blue hover:bg-nest-blue/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && user ? (
                <>
                  <Link to="/user" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-nest-text hover:text-nest-blue hover:bg-nest-blue/5 rounded">个人中心</Link>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-nest-text hover:text-nest-blue hover:bg-nest-blue/5 rounded">我的订单</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="px-3 py-2 text-sm text-left text-nest-red hover:bg-nest-red/5 rounded">退出登录</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-nest-blue hover:bg-nest-blue/5 rounded">登录/注册</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
