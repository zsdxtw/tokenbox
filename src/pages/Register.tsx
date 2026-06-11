import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, Store, Mail, Lock, Eye, EyeOff, Phone, Shield, FileText } from 'lucide-react';
import { useAuthStore, getMockUser, roleLabels, roleDescriptions } from '../store/useAuthStore';
import type { UserRole } from '../store/useAuthStore';

const roles: { key: UserRole; icon: typeof Building2 }[] = [
  { key: 'enterprise', icon: Building2 },
  { key: 'personal', icon: User },
  { key: 'seller', icon: Store },
];

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [role, setRole] = useState<UserRole>('enterprise');
  const [showPwd, setShowPwd] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ phone: '', code: '', password: '', confirm: '', company: '', credit: '', name: '', license: '' });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((err) => { const n = { ...err }; delete n[k]; return n; });
  };

  const sendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; });
    }, 1000);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.phone) e.phone = '请输入手机号';
    if (!form.code) e.code = '请输入验证码';
    if (!form.password) e.password = '请设置密码';
    if (form.password.length < 6) e.password = '密码至少6位';
    if (form.password !== form.confirm) e.confirm = '两次密码不一致';
    if (role === 'enterprise' && !form.company) e.company = '请输入公司名称';
    if (role === 'enterprise' && !form.credit) e.credit = '请输入信用代码';
    if (role === 'personal' && !form.name) e.name = '请输入姓名';
    if (role === 'seller' && !form.company) e.company = '请输入公司名称';
    if (role === 'seller' && !form.license) e.license = '请输入执照编号';
    if (!agreed) e.agreed = '请同意用户协议';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    login(getMockUser(role));
    navigate('/user-center');
  };

  const field = (key: string, placeholder: string, icon: React.ReactNode, type = 'text') => (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nest-muted">{icon}</span>
        <input type={type} value={form[key as keyof typeof form]} onChange={set(key)} placeholder={placeholder}
          className={`w-full pl-10 pr-3 py-2.5 bg-nest-surface border rounded-lg text-sm text-nest-text placeholder:text-nest-muted/50 focus:outline-none ${errors[key] ? 'border-nest-red' : 'border-nest-border focus:border-nest-blue'}`} />
      </div>
      {errors[key] && <p className="text-nest-red text-[10px] mt-1 ml-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 circuit-pattern relative">
      <div className="absolute inset-0 bg-gradient-radial from-nest-blue/5 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-nest-card/90 border border-nest-border rounded-2xl p-8 shadow-card backdrop-blur-sm"
      >
        <h1 className="font-display text-3xl font-bold gradient-text-blue text-center">注册算力巢</h1>
        <p className="text-center text-nest-muted mt-1 mb-6">创建您的账号</p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {roles.map(({ key, icon: Icon }) => (
            <button key={key} onClick={() => setRole(key)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg border transition-all text-xs
                ${role === key
                  ? 'bg-nest-blue/15 border-nest-blue shadow-glow-blue text-nest-blue'
                  : 'bg-nest-card border-nest-border text-nest-muted hover:border-nest-muted'}`}
            >
              <Icon size={20} />
              <span className="font-display font-semibold">{roleLabels[key]}</span>
              <span className="text-[10px] opacity-70 leading-tight">{roleDescriptions[key]}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {field('phone', '手机号', <Phone size={16} />)}
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nest-muted"><Shield size={16} /></span>
                <input type="text" value={form.code} onChange={set('code')} placeholder="验证码"
                  className={`w-full pl-10 pr-3 py-2.5 bg-nest-surface border rounded-lg text-sm text-nest-text placeholder:text-nest-muted/50 focus:outline-none ${errors.code ? 'border-nest-red' : 'border-nest-border focus:border-nest-blue'}`} />
              </div>
              {errors.code && <p className="text-nest-red text-[10px] mt-1 ml-1">{errors.code}</p>}
            </div>
            <button type="button" onClick={sendCode} disabled={countdown > 0}
              className={`shrink-0 px-3 py-2.5 rounded-lg text-xs font-display font-semibold border transition-colors
                ${countdown > 0 ? 'bg-nest-surface border-nest-border text-nest-muted cursor-not-allowed' : 'bg-nest-blue/10 border-nest-blue text-nest-blue hover:bg-nest-blue/20'}`}>
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nest-muted"><Lock size={16} /></span>
            <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="设置密码"
              className={`w-full pl-10 pr-10 py-2.5 bg-nest-surface border rounded-lg text-sm text-nest-text placeholder:text-nest-muted/50 focus:outline-none ${errors.password ? 'border-nest-red' : 'border-nest-border focus:border-nest-blue'}`} />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-nest-muted hover:text-nest-text">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-nest-red text-[10px] ml-1 -mt-1">{errors.password}</p>}
          {field('confirm', '确认密码', <Lock size={16} />, showPwd ? 'text' : 'password')}

          {role === 'enterprise' && (
            <>
              {field('company', '公司名称', <Building2 size={16} />)}
              {field('credit', '统一社会信用代码', <FileText size={16} />)}
            </>
          )}
          {role === 'personal' && field('name', '姓名', <User size={16} />)}
          {role === 'seller' && (
            <>
              {field('company', '公司名称', <Building2 size={16} />)}
              {field('license', '营业执照编号', <FileText size={16} />)}
            </>
          )}

          <label className="flex items-start gap-2 text-xs text-nest-muted cursor-pointer pt-1">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="accent-nest-blue mt-0.5" />
            <span>同意<a href="#" className="text-nest-blue hover:underline">《用户协议》</a>和<a href="#" className="text-nest-blue hover:underline">《隐私政策》</a></span>
          </label>
          {errors.agreed && <p className="text-nest-red text-[10px] ml-1 -mt-1">{errors.agreed}</p>}

          <button type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-nest-blue to-nest-blue-dark text-nest-bg font-display font-bold text-sm hover:shadow-glow-blue transition-shadow">
            注册
          </button>
        </form>

        <p className="text-center text-xs text-nest-muted mt-5">
          已有账号？<Link to="/login" className="text-nest-blue hover:underline">立即登录</Link>
        </p>
      </motion.div>
    </div>
  );
}
