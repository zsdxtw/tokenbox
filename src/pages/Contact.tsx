import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const contacts = [
  { icon: Phone, label: '客服热线', value: '400-888-8888', sub: '工作日 9:00-18:00' },
  { icon: Mail, label: '商务合作', value: 'business@powernest.com', sub: '' },
  { icon: Mail, label: '技术支持', value: 'support@powernest.com', sub: '' },
  { icon: MapPin, label: '公司地址', value: '北京市海淀区中关村软件园二期8号楼3层', sub: '' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', type: '采购咨询', message: '' });

  const handleSubmit = () => {
    if (form.name && form.contact && form.message) {
      alert('留言提交成功，我们会尽快与您联系！');
      setForm({ name: '', contact: '', type: '采购咨询', message: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-blue/10 flex items-center justify-center">
          <Phone className="w-5 h-5 text-nest-blue" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">联系我们</h1>
      </div>

      {/* 联系方式 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {contacts.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.3 }}
            className="bg-nest-card border border-nest-border rounded-lg p-5 flex flex-col items-center text-center">
            <c.icon size={28} className="text-nest-blue mb-3" />
            <p className="text-xs text-nest-muted mb-1">{c.label}</p>
            <p className="text-sm font-medium text-nest-text">{c.value}</p>
            {c.sub && <p className="text-xs text-nest-muted mt-1">{c.sub}</p>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 在线留言 */}
        <div className="bg-nest-card border border-nest-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={18} className="text-nest-blue" />
            <h2 className="font-display text-lg font-semibold text-nest-text">在线留言</h2>
          </div>
          <div className="space-y-3">
            <input placeholder="姓名" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
            <input placeholder="联系方式" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })}
              className="w-full px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text focus:outline-none focus:border-nest-blue">
              <option>采购咨询</option><option>售后问题</option><option>商务合作</option><option>其他</option>
            </select>
            <textarea placeholder="留言内容" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4}
              className="w-full px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue resize-none" />
            <button onClick={handleSubmit} className="w-full px-4 py-2.5 bg-gradient-to-r from-nest-blue to-nest-blue-dark text-nest-bg rounded font-display font-semibold hover:shadow-glow-blue transition-shadow">
              提交
            </button>
          </div>
        </div>

        {/* 地图占位 */}
        <div className="bg-nest-card border border-nest-border rounded-lg p-5 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <MapPin size={40} className="mx-auto text-nest-muted/30 mb-3" />
            <p className="text-sm text-nest-muted">地图加载区域</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
