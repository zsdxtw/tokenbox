import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, Store, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore, getMockUser, roleLabels, roleDescriptions } from '../store/useAuthStore';
import type { UserRole } from '../store/useAuthStore';

const roles: { key: UserRole; icon: typeof Building2 }[] = [
  { key: 'enterprise', icon: Building2 },
  { key: 'personal', icon: User },
  { key: 'seller', icon: Store },
];

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [role, setRole] = useState<UserRole>('enterprise');
  const [showPwd, setShowPwd] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(getMockUser(role));
    navigate('/user-center');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 circuit-pattern relative">
      <div className="absolute inset-0 bg-gradient-radial from-nest-blue/5 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-nest-card/90 border border-nest-border rounded-2xl p-8 shadow-card backdrop-blur-sm"
      >
        <h1 className="font-display text-3xl font-bold gradient-text-blue text-center">登录算力巢</h1>
        <p className="text-center text-nest-muted mt-1 mb-6">欢迎回来</p>

        {/* Role selector */}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nest-muted" />
            <input type="text" placeholder="手机号/邮箱"
              className="w-full pl-10 pr-3 py-2.5 bg-nest-surface border border-nest-border rounded-lg text-sm text-nest-text placeholder:text-nest-muted/50 focus:outline-none focus:border-nest-blue" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nest-muted" />
            <input type={showPwd ? 'text' : 'password'} placeholder="密码"
              className="w-full pl-10 pr-10 py-2.5 bg-nest-surface border border-nest-border rounded-lg text-sm text-nest-text placeholder:text-nest-muted/50 focus:outline-none focus:border-nest-blue" />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-nest-muted hover:text-nest-text">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="验证码"
              className="flex-1 px-3 py-2.5 bg-nest-surface border border-nest-border rounded-lg text-sm text-nest-text placeholder:text-nest-muted/50 focus:outline-none focus:border-nest-blue" />
            <button type="button" onClick={sendCode} disabled={countdown > 0}
              className={`shrink-0 px-3 py-2.5 rounded-lg text-xs font-display font-semibold border transition-colors
                ${countdown > 0 ? 'bg-nest-surface border-nest-border text-nest-muted cursor-not-allowed' : 'bg-nest-blue/10 border-nest-blue text-nest-blue hover:bg-nest-blue/20'}`}>
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-nest-muted cursor-pointer">
              <input type="checkbox" className="accent-nest-blue rounded" /> 记住我
            </label>
            <a href="#" className="text-nest-blue hover:underline">忘记密码?</a>
          </div>

          <button type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-nest-blue to-nest-blue-dark text-nest-bg font-display font-bold text-sm hover:shadow-glow-blue transition-shadow">
            登录
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-nest-border" />
          <span className="text-xs text-nest-muted">或</span>
          <div className="flex-1 h-px bg-nest-border" />
        </div>

        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 rounded-full bg-nest-green/10 border border-nest-green/30 flex items-center justify-center text-nest-green hover:bg-nest-green/20 transition-colors" title="微信登录">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.87 13.13c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.82 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-nest-blue/10 border border-nest-blue/30 flex items-center justify-center text-nest-blue hover:bg-nest-blue/20 transition-colors" title="支付宝登录">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.422 15.358c-3.32-1.326-6.092-2.786-6.092-2.786s1.439-3.667 1.853-5.943H13.01V5.037h5.16V3.878h-5.16V1.013h-2.384s-.036.012-.036.048v2.817H5.42v1.159h5.17V6.63H6.478v1.158h8.625c-.316 1.517-1.098 3.66-1.098 3.66S10.072 9.79 7.5 9.79c-3.265 0-4.928 2.18-4.928 4.048 0 2.545 2.466 4.162 5.348 4.162 2.766 0 4.864-1.478 6.494-3.648 2.647 1.397 7.552 3.277 7.552 3.277a.593.593 0 00.785-.293.593.593 0 00-.329-.978zM8.028 16.26c-2.466 0-3.677-1.349-3.677-2.682 0-1.477 1.291-2.662 3.27-2.662 2.136 0 4.373 1.126 5.436 1.826C11.965 14.577 10.257 16.26 8.028 16.26z"/></svg>
          </button>
        </div>

        <p className="text-center text-xs text-nest-muted mt-5">
          还没有账号？<Link to="/register" className="text-nest-blue hover:underline">立即注册</Link>
        </p>
        <p className="text-center text-[10px] text-nest-muted/50 mt-2">
          演示账号：选择角色后直接点击登录即可体验
        </p>
      </motion.div>
    </div>
  );
}
