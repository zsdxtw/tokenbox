import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { newsList, categoryLabels, categoryColors } from '../data/news';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const news = newsList.find(n => n.id === id);

  if (!news) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-nest-muted font-display mb-4">资讯未找到</p>
        <Link to="/market" className="text-sm text-nest-blue hover:underline">返回行情资讯</Link>
      </motion.div>
    );
  }

  const related = newsList.filter(n => n.id !== news.id && n.category === news.category).slice(0, 3);
  const fallback = related.length < 3 ? [...related, ...newsList.filter(n => n.id !== news.id && n.category !== news.category).slice(0, 3 - related.length)] : related;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-nest-muted mb-6">
        <Link to="/" className="hover:text-nest-blue transition-colors">首页</Link>
        <ChevronRight size={14} />
        <Link to="/market" className="hover:text-nest-blue transition-colors">行情资讯</Link>
        <ChevronRight size={14} />
        <span className="text-nest-text truncate max-w-xs">{news.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Article */}
        <div className="lg:col-span-2">
          <div className="bg-nest-card border border-nest-border rounded-lg p-6">
            <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium mb-4 ${categoryColors[news.category]}`}>
              {categoryLabels[news.category]}
            </span>
            <h1 className="font-display text-2xl font-bold text-nest-text mb-3">{news.title}</h1>
            <p className="text-xs text-nest-muted mb-6">{news.source} · {news.date}</p>
            <div className="space-y-4">
              {news.content.split('\n\n').map((p, i) => (
                <p key={i} className="text-sm text-nest-text/80 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-nest-border">
              <button onClick={() => navigate('/market')} className="flex items-center gap-1.5 text-sm text-nest-blue hover:underline">
                <ArrowLeft size={14} /> 返回资讯列表
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-nest-card border border-nest-border rounded-lg p-4">
            <h3 className="font-display text-base font-semibold text-nest-text mb-3">相关资讯</h3>
            <div className="space-y-3">
              {fallback.map(n => (
                <Link key={n.id} to={`/news/${n.id}`} className="block group">
                  <p className="text-sm text-nest-text group-hover:text-nest-blue transition-colors leading-snug mb-1">{n.title}</p>
                  <p className="text-xs text-nest-muted">{n.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
