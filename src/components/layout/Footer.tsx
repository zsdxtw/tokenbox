import { Link } from 'react-router-dom';
import { Shield, Truck, Headphones, Wrench, Phone, Mail, MapPin } from 'lucide-react';

const guarantees = [
  { icon: Shield, label: '正品保障', desc: '100%正品承诺' },
  { icon: Truck, label: '货期承诺', desc: '准时交付保障' },
  { icon: Headphones, label: '专属技术顾问', desc: '1对1技术支持' },
  { icon: Wrench, label: '售后无忧', desc: '全生命周期服务' },
];

const footerColumns = [
  {
    title: '关于我们',
    links: [
      { label: '关于算力巢', to: '/about' },
      { label: '联系我们', to: '/contact' },
      { label: '加入我们', to: '/about' },
    ],
  },
  {
    title: '采购服务',
    links: [
      { label: '企业采购', to: '/ai-computing' },
      { label: '批量询价', to: '/contact' },
      { label: '定制方案', to: '/contact' },
    ],
  },
  {
    title: '帮助中心',
    links: [
      { label: '常见问题', to: '/help' },
      { label: '退换政策', to: '/help' },
      { label: '配送说明', to: '/help' },
    ],
  },
];

const contactInfo = [
  { icon: Phone, label: '电话', value: '400-888-8888' },
  { icon: Mail, label: '邮箱', value: 'service@powernest.com' },
  { icon: MapPin, label: '地址', value: '北京市海淀区中关村软件园二期8号楼3层' },
];

export default function Footer() {
  return (
    <footer className="bg-nest-surface border-t border-nest-border">
      {/* Service Guarantees */}
      <div className="border-b border-nest-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={28} className="text-nest-blue shrink-0" />
                <div>
                  <div className="text-sm font-medium text-nest-text">{label}</div>
                  <div className="text-xs text-nest-muted">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl font-bold text-nest-blue" style={{ textShadow: '0 0 8px rgba(0,212,255,0.3)' }}>算力巢</span>
              <span className="font-display text-xs text-nest-muted">PowerNest</span>
            </div>
            <p className="text-xs text-nest-muted leading-relaxed">
              数字化算力基础设施服务平台，从电力到算力，一站全搞定。
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-nest-text mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-nest-muted hover:text-nest-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="font-display text-sm font-semibold text-nest-text mb-4">联系方式</h4>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-2">
                  <Icon size={14} className="text-nest-blue mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-nest-muted">{label}</div>
                    <div className="text-sm text-nest-text">{value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-nest-border">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-nest-muted">
          <span>Copyright © 2026 算力巢 PowerNest. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-nest-blue transition-colors">隐私政策</Link>
            <Link to="/about" className="hover:text-nest-blue transition-colors">用户协议</Link>
            <Link to="/help" className="hover:text-nest-blue transition-colors">帮助中心</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
