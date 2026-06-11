import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';

const hotTags = ['NVIDIA H100', '蚂蚁矿机 S19', '液冷服务器', '4090显卡', 'PDU配电'];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const setSearchQuery = useProductStore((s) => s.setSearchQuery);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearchQuery(query.trim());
    navigate('/ai-computing');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    navigate('/ai-computing');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20">
      <div className="flex items-center bg-nest-card border border-nest-border rounded-xl overflow-hidden transition-all duration-300 focus-within:border-nest-blue focus-within:shadow-glow-blue">
        <Search className="ml-4 w-5 h-5 text-nest-muted flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="请输入设备型号、算力或品牌..."
          className="flex-1 bg-transparent px-3 py-4 text-nest-text placeholder-nest-muted outline-none font-body"
        />
        <button
          onClick={handleSearch}
          className="mr-1.5 px-6 py-2.5 rounded-lg bg-gradient-to-r from-nest-blue to-nest-blue-dark text-nest-bg font-display font-semibold hover:shadow-glow-blue transition-shadow duration-300"
        >
          搜索
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-nest-muted">热门搜索:</span>
        {hotTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="text-xs text-nest-blue hover:bg-nest-card px-2 py-1 rounded transition-colors duration-200"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
