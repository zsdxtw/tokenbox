import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketData, MarketDataItem } from '../../data/marketData';

function TickerItem({ item }: { item: MarketDataItem }) {
  const isPositive = item.changePercent >= 0;

  return (
    <div className="flex items-center gap-3 px-6 py-2 flex-shrink-0 whitespace-nowrap">
      <span className="text-sm font-display font-semibold text-nest-text">
        {item.symbol}
      </span>
      <span className="text-xs text-nest-muted">{item.name}</span>
      <span className="text-sm font-display font-semibold text-nest-text">
        {item.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <span
        className={`flex items-center gap-0.5 text-xs font-display font-semibold ${
          isPositive ? 'text-nest-green' : 'text-nest-red'
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {isPositive ? '+' : ''}
        {item.changePercent.toFixed(2)}%
      </span>
    </div>
  );
}

export default function MarketTicker() {
  const doubled = [...marketData, ...marketData];

  return (
    <div className="w-full bg-nest-surface border-b border-nest-border overflow-hidden">
      <div
        className="flex animate-ticker hover:[animation-play-state:paused]"
      >
        {doubled.map((item, i) => (
          <TickerItem key={`${item.symbol}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
