/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        nest: {
          bg: '#0A0E17',
          surface: '#111827',
          card: '#1A1F2E',
          border: '#2A3040',
          muted: '#6B7280',
          text: '#E5E7EB',
          blue: '#00D4FF',
          'blue-dark': '#0099CC',
          orange: '#FF8C00',
          'orange-dark': '#CC7000',
          green: '#00E676',
          yellow: '#FFD600',
          red: '#FF4757',
          // 链路色彩体系（解决方案页专用）
          'chain-power': '#FFB020',
          'chain-transfer': '#00B4D8',
          'chain-cooling': '#48BFE6',
          'chain-compute': '#7B61FF',
          'chain-cluster': '#0091FF',
        }
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Noto Sans SC', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-blue': 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
        'glow-orange': 'radial-gradient(circle, rgba(255,140,0,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0,212,255,0.3)',
        'glow-orange': '0 0 20px rgba(255,140,0,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,212,255,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0,212,255,0.4)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
