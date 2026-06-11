import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingCart, Bell, Heart, Package, Settings, LogOut, CreditCard, Truck, CheckCircle, Zap } from 'lucide-react';
import { useAuthStore, roleLabels } from '../store/useAuthStore';
import { orders, statusLabels, statusColors } from '../data/orders';
import type { OrderStatus } from '../data/orders';

const navItems = (role: string) => [
  { icon: User, label: '个人中心', to: '/user', active: true },
  { icon: ShoppingCart, label: '我的订单', to: '/orders' },
  { icon: Bell, label: '消息通知', to: '#', badge: '3' },
  { icon: Heart, label: '收藏夹', to: '#' },
  ...(role === 'seller' ? [{ icon: Package, label: '寄售管理', to: '#' }] : []),
  { icon: Settings, label: '账户设置', to: '#' },
];

export default function UserCenter() {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true });
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const myOrders = orders.filter((o) => o.userId === user.id);
  const stats = {
    pending: myOrders.filter((o) => o.status === 'pending').length,
    shipped: myOrders.filter((o) => o.status === 'shipped').length,
    delivered: myOrders.filter((o) => o.status === 'delivered').length,
    fav: 12,
  };
  const recent = [...myOrders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 space-y-4">
        <div className="bg-nest-card border border-nest-border rounded-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-nest-blue to-nest-blue-dark flex items-center justify-center text-2xl font-display font-bold text-nest-bg mb-3">
            {user.name[0]}
          </div>
          <p className="font-display font-semibold text-nest-text">{user.name}</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-nest-blue/10 text-nest-blue">{roleLabels[user.role]}</span>
          <button className="mt-3 text-xs text-nest-muted hover:text-nest-blue transition-colors">编辑资料</button>
        </div>
        <nav className="bg-nest-card border border-nest-border rounded-lg divide-y divide-nest-border">
          {navItems(user.role).map((item) => (
            <Link key={item.label} to={item.to} className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${item.active ? 'text-nest-blue bg-nest-blue/5' : 'text-nest-muted hover:text-nest-text'}`}>
              <item.icon size={16} />
              <span className="flex-1">{item.label}</span>
              {item.badge && <span className="px-1.5 py-0.5 text-xs rounded-full bg-nest-red text-white">{item.badge}</span>}
            </Link>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-nest-red hover:bg-nest-red/5 transition-colors">
            <LogOut size={16} /><span>退出登录</span>
          </button>
        </nav>
      </aside>

      {/* Main */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex-1 space-y-6 min-w-0">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-nest-blue/20 to-nest-orange/10 border border-nest-border rounded-lg p-6">
          <h1 className="font-display text-2xl font-bold text-nest-text">欢迎回来，{user.name}</h1>
          <p className="text-sm text-nest-muted mt-1">{today}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '待付款', value: stats.pending, icon: CreditCard, color: 'text-nest-orange' },
            { label: '已发货', value: stats.shipped, icon: Truck, color: 'text-nest-green' },
            { label: '已完成', value: stats.delivered, icon: CheckCircle, color: 'text-nest-muted' },
            { label: '收藏', value: stats.fav, icon: Heart, color: 'text-nest-red' },
          ].map((s) => (
            <div key={s.label} className="bg-nest-card border border-nest-border rounded-lg p-4 flex items-center gap-3">
              <s.icon size={20} className={s.color} />
              <div><p className="text-xs text-nest-muted">{s.label}</p><p className={`font-display text-xl font-bold ${s.color}`}>{s.value}</p></div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '去采购', to: '/ai-computing', icon: Zap, gradient: 'from-nest-blue to-nest-blue-dark' },
            { label: '二手置换', to: '/secondhand', icon: Package, gradient: 'from-nest-orange to-nest-orange-dark' },
            { label: '查看行情', to: '/market', icon: CreditCard, gradient: 'from-nest-green to-emerald-700' },
            { label: '联系客服', to: '#', icon: User, gradient: 'from-nest-muted to-gray-600' },
          ].map((a) => (
            <Link key={a.label} to={a.to} className={`flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r ${a.gradient} text-white font-display font-semibold text-sm hover:shadow-lg transition-shadow`}>
              <a.icon size={16} />{a.label}
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-nest-card border border-nest-border rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-nest-border">
            <h2 className="font-display font-semibold text-nest-text">最近订单</h2>
            <Link to="/orders" className="text-xs text-nest-blue hover:underline">查看全部</Link>
          </div>
          {recent.length === 0 ? (
            <p className="py-10 text-center text-nest-muted text-sm">暂无订单</p>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="text-nest-muted text-xs"><th className="text-left px-5 py-2">订单号</th><th className="text-left px-3 py-2">商品</th><th className="text-right px-3 py-2">金额</th><th className="text-center px-3 py-2">状态</th><th className="text-right px-5 py-2">日期</th></tr></thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-t border-nest-border hover:bg-nest-surface/50">
                    <td className="px-5 py-3 text-nest-blue font-mono text-xs">{o.id}</td>
                    <td className="px-3 py-3 text-nest-text truncate max-w-[200px]">{o.items.map((i) => i.name).join('、')}</td>
                    <td className="px-3 py-3 text-right font-display font-semibold text-nest-orange">¥{o.totalAmount.toLocaleString()}</td>
                    <td className={`px-3 py-3 text-center ${statusColors[o.status as OrderStatus]}`}>{statusLabels[o.status as OrderStatus]}</td>
                    <td className="px-5 py-3 text-right text-nest-muted">{o.createdAt.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
