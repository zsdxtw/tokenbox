export interface MarketDataItem {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent: number;
  history: { time: string; price: number }[];
}

function generateHistory(basePrice: number, volatility: number, trend: number): { time: string; price: number }[] {
  const history: { time: string; price: number }[] = [];
  let price = basePrice * (1 - trend * 24);
  const now = new Date('2026-06-11T12:00:00+08:00');

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600 * 1000);
    const timeStr = `${time.getHours().toString().padStart(2, '0')}:00`;
    const change = (Math.random() - 0.5) * 2 * volatility * price;
    const trendComponent = trend * price;
    price = price + change + trendComponent;
    if (price < 0) price = basePrice * 0.5;
    history.push({ time: timeStr, price: Math.round(price * 100) / 100 });
  }

  return history;
}

export const marketData: MarketDataItem[] = [
  {
    symbol: 'BTC/USDT',
    name: '比特币',
    price: 108523.45,
    change24h: 1256.78,
    changePercent: 1.17,
    history: generateHistory(108523.45, 0.008, 0.0005),
  },
  {
    symbol: 'ETH/USDT',
    name: '以太坊',
    price: 3842.16,
    change24h: -48.32,
    changePercent: -1.24,
    history: generateHistory(3842.16, 0.012, -0.0005),
  },
  {
    symbol: 'NVDA',
    name: '英伟达股票',
    price: 135.28,
    change24h: 3.42,
    changePercent: 2.59,
    history: generateHistory(135.28, 0.006, 0.001),
  },
  {
    symbol: 'RTX4090-IDX',
    name: 'RTX 4090价格指数',
    price: 16800,
    change24h: 200,
    changePercent: 1.20,
    history: generateHistory(16800, 0.004, 0.0003),
  },
  {
    symbol: 'HASH-DIFF',
    name: '算力难度指数',
    price: 88.56,
    change24h: 0.32,
    changePercent: 0.36,
    history: generateHistory(88.56, 0.003, 0.0002),
  },
];
