import { Link } from 'react-router-dom';
import { newsList, categoryLabels, categoryColors } from '../../data/news';

export default function NewsList() {
  return (
    <div className="bg-nest-card rounded-lg border border-nest-border p-4">
      <h3 className="text-sm font-medium text-nest-text mb-3">行业资讯</h3>
      <div className="space-y-3">
        {newsList.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="group block border-b border-nest-border pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-2">
              <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded ${categoryColors[item.category] || 'bg-nest-surface text-nest-muted'}`}>
                {categoryLabels[item.category] || item.category}
              </span>
              <p className="text-sm text-nest-text leading-snug line-clamp-2 group-hover:text-nest-blue transition-colors">
                {item.title}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1 ml-[52px]">
              <span className="text-xs text-nest-muted">{item.source}</span>
              <span className="text-xs text-nest-muted">{item.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
