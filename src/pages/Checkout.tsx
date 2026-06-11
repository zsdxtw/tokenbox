import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, MapPin, FileText, Truck, CreditCard, MessageSquare, Plus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface Address { name: string; phone: string; region: string; detail: string; }

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const [address, setAddress] = useState<Address | null>(null);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState<Address>({ name: '', phone: '', region: '', detail: '' });

  const [invoiceType, setInvoiceType] = useState<'none' | 'personal' | 'enterprise'>('none');
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');

  const [shipping, setShipping] = useState<'standard' | 'express' | 'install'>('standard');
  const [payment, setPayment] = useState<'bank' | 'alipay' | 'wechat'>('bank');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items.length, navigate]);

  const shippingFee = shipping === 'standard' ? 0 : shipping === 'express' ? 200 : 500;
  const grandTotal = total + shippingFee;

  const handleSaveAddr = () => {
    if (addrForm.name && addrForm.phone && addrForm.region && addrForm.detail) {
      setAddress(addrForm);
      setShowAddrForm(false);
    }
  };

  const handleSubmit = () => {
    alert('订单提交成功！');
    clearCart();
    navigate('/orders');
  };

  const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
    <div className="bg-nest-card border border-nest-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} className="text-nest-blue" />
        <h2 className="font-display text-lg font-semibold text-nest-text">{title}</h2>
      </div>
      {children}
    </div>
  );

  const Radio = ({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${checked ? 'border-nest-blue' : 'border-nest-border'}`}>
        {checked && <span className="w-2 h-2 rounded-full bg-nest-blue" />}
      </span>
      <span className="text-sm text-nest-text">{label}</span>
    </label>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-orange/10 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-nest-orange" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">确认订单</h1>
      </div>

      <div className="space-y-4">
        {/* 收货地址 */}
        <Section icon={MapPin} title="收货地址">
          {address ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-nest-text">{address.name} {address.phone} — {address.region} {address.detail}</p>
              <button onClick={() => setShowAddrForm(true)} className="text-xs text-nest-blue hover:underline">修改</button>
            </div>
          ) : showAddrForm ? (
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="收件人" value={addrForm.name} onChange={e => setAddrForm({ ...addrForm, name: e.target.value })} className="col-span-1 px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
              <input placeholder="手机号" value={addrForm.phone} onChange={e => setAddrForm({ ...addrForm, phone: e.target.value })} className="col-span-1 px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
              <input placeholder="省市区" value={addrForm.region} onChange={e => setAddrForm({ ...addrForm, region: e.target.value })} className="col-span-2 px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
              <input placeholder="详细地址" value={addrForm.detail} onChange={e => setAddrForm({ ...addrForm, detail: e.target.value })} className="col-span-2 px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
              <button onClick={handleSaveAddr} className="col-span-2 px-4 py-2 bg-nest-blue text-nest-bg rounded text-sm font-display font-semibold hover:shadow-glow-blue transition-shadow">保存地址</button>
            </div>
          ) : (
            <button onClick={() => setShowAddrForm(true)} className="flex items-center gap-1 text-sm text-nest-blue hover:underline">
              <Plus size={14} /> 新增地址
            </button>
          )}
        </Section>

        {/* 商品清单 */}
        <Section icon={ShoppingCart} title="商品清单">
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.productId} className="flex items-center gap-3 py-2 border-b border-nest-border last:border-0">
                <div className="w-12 h-12 rounded bg-nest-surface overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="flex-1 text-sm text-nest-text truncate">{item.name}</span>
                <span className="text-sm text-nest-muted">¥{item.price.toLocaleString()} × {item.quantity}</span>
                <span className="text-sm font-display font-semibold text-nest-text">¥{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 发票信息 */}
        <Section icon={FileText} title="发票信息">
          <div className="space-y-2">
            <Radio checked={invoiceType === 'none'} onClick={() => setInvoiceType('none')} label="不开发票" />
            <Radio checked={invoiceType === 'personal'} onClick={() => setInvoiceType('personal')} label="个人发票" />
            <Radio checked={invoiceType === 'enterprise'} onClick={() => setInvoiceType('enterprise')} label="企业发票" />
            {invoiceType === 'enterprise' && (
              <div className="grid grid-cols-2 gap-3 mt-2">
                <input placeholder="企业名称" value={companyName} onChange={e => setCompanyName(e.target.value)} className="px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
                <input placeholder="税号" value={taxId} onChange={e => setTaxId(e.target.value)} className="px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue" />
              </div>
            )}
          </div>
        </Section>

        {/* 配送方式 */}
        <Section icon={Truck} title="配送方式">
          <div className="space-y-2">
            <Radio checked={shipping === 'standard'} onClick={() => setShipping('standard')} label="标准物流（免费）" />
            <Radio checked={shipping === 'express'} onClick={() => setShipping('express')} label="加急配送（¥200）" />
            <Radio checked={shipping === 'install'} onClick={() => setShipping('install')} label="送货上楼+安装调试（¥500）" />
          </div>
        </Section>

        {/* 支付方式 */}
        <Section icon={CreditCard} title="支付方式">
          <div className="space-y-2">
            <Radio checked={payment === 'bank'} onClick={() => setPayment('bank')} label="银行转账" />
            <Radio checked={payment === 'alipay'} onClick={() => setPayment('alipay')} label="支付宝" />
            <Radio checked={payment === 'wechat'} onClick={() => setPayment('wechat')} label="微信支付" />
          </div>
        </Section>

        {/* 订单备注 */}
        <Section icon={MessageSquare} title="订单备注">
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="请输入备注信息…" className="w-full px-3 py-2 bg-nest-surface border border-nest-border rounded text-sm text-nest-text placeholder:text-nest-muted focus:outline-none focus:border-nest-blue resize-none" />
        </Section>
      </div>

      {/* 底部结算栏 */}
      <div className="mt-6 bg-nest-card border border-nest-border rounded-lg p-4 flex items-center justify-between">
        <div className="space-y-1 text-sm">
          <div className="flex gap-6">
            <span className="text-nest-muted">商品合计：<span className="text-nest-text">¥{total.toLocaleString()}</span></span>
            <span className="text-nest-muted">运费：<span className="text-nest-text">¥{shippingFee}</span></span>
            <span className="text-nest-muted">发票税额：<span className="text-nest-text">¥0</span></span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-nest-muted">应付总额：</span>
            <span className="font-display text-2xl font-bold text-nest-orange ml-1">¥{grandTotal.toLocaleString()}</span>
          </div>
          <button onClick={handleSubmit} className="px-8 py-3 rounded-lg bg-gradient-to-r from-nest-orange to-nest-orange-dark text-white font-display font-semibold hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] transition-shadow">
            提交订单
          </button>
        </div>
      </div>
    </motion.div>
  );
}
