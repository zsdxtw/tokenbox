import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingCart, Bell, Heart, Package, Settings, LogOut } from 'lucide-react';
import { useAuthStore, roleLabels } from '../store/useAuthStore';
import { orders, statusLabels, statusColors } from '../data/orders';
import type { OrderStatus } from '../data/orders';

const tabs: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'paid', label: '已付款' },
  { key: 'shipped', label: '已发货' },
  { key: 'delivered', label: '已完成' },
  { key: 'cancelled', label: '已取消' },
];

const conditionLabels: Record<string, string> = { new: '全新', 'used-99': '99新', 'used-refurbished': '翻新', 'used-functional': '良品' };

const sidebarNav = (role: string) => [
  { icon: User, label: '个人中心', to: '/user' },
  { icon: ShoppingCart, label: '我的订单', to: '/orders', active: true },
  { icon: Bell, label: '消息通知', to: '#', badge: '3' },
  { icon: Heart, label: '收藏夹', to: '#' },
  ...(role === 'seller' ? [{ icon: Package, label: '寄售管理', to: '#' }] : []),
  { icon: Settings, label: '账户设置', to: '#' },
];

export default function Orders() {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true });
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const myOrders = orders.filter((o) => o.userId === user.id);
  const filtered = activeTab === 'all' ? myOrders : myOrders.filter((o) => o.status === activeTab);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 space-y-4">
        <div className="bg-nest-card border border-nest-border rounded-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-nest-blue to-nest-blue-dark flex items-center justify-center text-2xl font-display font-bold text-nest-bg mb-3">{user.name[0]}</div>
          <p className="font-display font-semibold text-nest-text">{user.name}</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-nest-blue/10 text-nest-blue">{roleLabels[user.role]}</span>
          <button className="mt-3 text-xs text-nest-muted hover:text-nest-blue transition-colors">编辑资料</button>
        </div>
        <nav className="bg-nest-card border border-nest-border rounded-lg divide-y divide-nest-border">
          {sidebarNav(user.role).map((item) => (
            <Link key={item.label} to={item.to} className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${item.active ? 'text-nest-blue bg-nest-blue/5' : 'text-nest-muted hover:text-nest-text'}`}>
              <item.icon size={16} /><span className="flex-1">{item.label}</span>
              {item.badge && <span className="px-1.5 py-0.5 text-xs rounded-full bg-nest-red text-white">{item.badge}</span>}
            </Link>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-nest-red hover:bg-nest-red/5 transition-colors">
            <LogOut size={16} /><span>退出登录</span>
          </button>
        </nav>
      </aside>

      {/* Main */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex-1 space-y-5 min-w-0">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-nest-text">我的订单</h1>
          <span className="text-sm text-nest-muted">共 {myOrders.length} 笔订单</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-4 py-1.5 rounded-lg text-sm font-display font-semibold transition-colors ${activeTab === t.key ? 'bg-nest-blue text-nest-bg' : 'bg-nest-card border border-nest-border text-nest-muted hover:text-nest-text'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Package size={48} className="mx-auto text-nest-muted/30 mb-3" />
            <p className="text-nest-muted">暂无相关订单</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div key={order.id} className="bg-nest-card border border-nest-border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-nest-surface border-b border-nest-border text-sm">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-nest-muted">{order.id}</span>
                    <span className="text-nest-muted">{order.createdAt}</span>
                  </div>
                  <span className={`font-display font-semibold ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                </div>
                {/* Items */}
                <div className="px-5 py-3 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg bg-nest-surface object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-nest-text truncate">{item.name}</p>
                        <p className="text-xs text-nest-muted">{conditionLabels[item.condition] || item.condition}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-display font-semibold text-nest-text">¥{item.price.toLocaleString()}</p>
                        <p className="text-xs text-nest-muted">x{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-nest-border">
                  <span className="text-sm text-nest-muted">合计：<span className="font-display text-lg font-bold text-nest-orange">¥{order.totalAmount.toLocaleString()}</span></span>
                  <div className="flex items-center gap-3">
                    {order.status === 'pending' && (
                      <>
                        <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-nest-orange to-nest-orange-dark text-white text-sm font-display font-semibold">去付款</button>
                        <button className="text-sm text-nest-muted hover:text-nest-red transition-colors">取消订单</button>
                      </>
                    )}
                    {order.status === 'paid' && <button className="px-4 py-1.5 rounded-lg border border-nest-border text-nest-text text-sm font-display font-semibold hover:border-nest-blue transition-colors">查看物流</button>}
                    {order.status === 'shipped' && <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-nest-blue to-nest-blue-dark text-nest-bg text-sm font-display font-semibold">确认收货</button>}
                    {order.status === 'delivered' && (
                      <>
                        <button className="px-4 py-1.5 rounded-lg border border-nest-border text-nest-text text-sm font-display font-semibold hover:border-nest-blue transition-colors">再次购买</button>
                        <button className="text-sm text-nest-muted hover:text-nest-blue transition-colors">评价</button>
                      </>
                    )}
                    {order.status === 'cancelled' && <button className="px-4 py-1.5 rounded-lg border border-nest-border text-nest-text text-sm font-display font-semibold hover:border-nest-blue transition-colors">再次购买</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
