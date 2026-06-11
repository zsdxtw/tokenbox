import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

export default function TradeInBanner() {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-nest-orange-dark via-nest-orange to-nest-orange-dark p-8 md:p-12">
          {/* Decorative icon */}
          <RefreshCw className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 text-white/5" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                高价回收闲置设备
              </h2>
              <p className="mt-2 text-white/80 font-body">
                支持以旧换新，专业质检，极速回款
              </p>
            </div>
            <Link
              to="/secondhand"
              className="flex-shrink-0 px-8 py-3.5 rounded-lg bg-white text-nest-orange font-display font-semibold text-lg hover:bg-white/90 transition-colors duration-300"
            >
              立即估价
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
