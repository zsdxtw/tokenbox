import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-nest-bg via-nest-surface to-nest-bg">
      {/* Circuit board pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-glow-blue opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-nest-blue via-cyan-300 to-nest-blue bg-clip-text text-transparent leading-tight"
        >
          从电力到算力，一站全搞定
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 text-lg md:text-xl text-nest-muted font-body"
        >
          一站式算力设备采购与管理平台
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/ai-computing"
            className="px-8 py-3.5 rounded-lg font-display font-semibold text-nest-bg bg-gradient-to-r from-nest-blue to-nest-blue-dark hover:shadow-glow-blue transition-shadow duration-300 text-lg"
          >
            立即采购
          </Link>
          <Link
            to="/secondhand"
            className="px-8 py-3.5 rounded-lg font-display font-semibold text-nest-orange border-2 border-nest-orange hover:bg-nest-orange/10 transition-colors duration-300 text-lg"
          >
            二手置换
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
