import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MarketDataItem } from '../../data/marketData';

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-nest-surface border border-nest-border rounded px-3 py-2 text-xs shadow-card">
      <p className="text-nest-muted mb-1">{label}</p>
      <p className="text-nest-blue font-display font-bold">¥{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function PriceChart({ data }: { data: MarketDataItem }) {
  const isPositive = data.change24h >= 0;

  return (
    <div className="bg-nest-card rounded-lg border border-nest-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-nest-text">{data.name}</h3>
        <div className="text-right">
          <p className="text-lg font-display font-bold text-nest-text">
            ¥{data.price.toLocaleString()}
          </p>
          <p className={`text-xs font-display ${isPositive ? 'text-nest-green' : 'text-nest-red'}`}>
            {isPositive ? '+' : ''}{data.change24h.toLocaleString()} ({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.history}>
            <XAxis
              dataKey="time"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={{ stroke: '#2A3040' }}
              tickLine={{ stroke: '#2A3040' }}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={{ stroke: '#2A3040' }}
              tickLine={{ stroke: '#2A3040' }}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00D4FF"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#00D4FF', stroke: '#1A1F2E', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
