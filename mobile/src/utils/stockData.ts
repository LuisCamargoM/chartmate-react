import { ChartData, Stock, Portfolio, MarketIndex } from '../types';

export const generateStockData = (days: number): ChartData[] => {
  const data: ChartData[] = [];
  let price = 150 + Math.random() * 50; // Start between $150-200
  const baseTime = Date.now() - (days * 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 10; // Random change ±$5
    price = Math.max(50, price + change); // Don't go below $50
    
    data.push({
      time: new Date(baseTime + (i * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  
  return data;
};

export const marketData: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 192.53,
    change: 2.41,
    changePercent: 1.27,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 378.85,
    change: -1.22,
    changePercent: -0.32,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 138.21,
    change: 3.15,
    changePercent: 2.33,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.50,
    change: -8.73,
    changePercent: -3.39,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 127.74,
    change: 1.84,
    changePercent: 1.46,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 429.89,
    change: 12.45,
    changePercent: 2.98,
  },
];

export const portfolioData: Portfolio[] = [
  { symbol: 'AAPL', shares: 150, avgPrice: 175.32, currentPrice: 192.53 },
  { symbol: 'MSFT', shares: 100, avgPrice: 350.25, currentPrice: 378.85 },
  { symbol: 'GOOGL', shares: 75, avgPrice: 125.80, currentPrice: 138.21 },
];

export const indices: MarketIndex[] = [
  {
    name: 'S&P 500',
    value: 4769.83,
    change: 23.87,
    changePercent: 0.50,
  },
  {
    name: 'NASDAQ',
    value: 14967.87,
    change: 85.49,
    changePercent: 0.57,
  },
  {
    name: 'DOW JONES',
    value: 37248.35,
    change: -45.33,
    changePercent: -0.12,
  },
];

export const watchlistData: Stock[] = [
  { symbol: 'NVDA', price: 429.89, change: 12.45, changePercent: 2.98 },
  { symbol: 'AMD', price: 98.74, change: -2.31, changePercent: -2.29 },
  { symbol: 'META', price: 352.89, change: 8.12, changePercent: 2.35 },
  { symbol: 'NFLX', price: 486.23, change: -5.67, changePercent: -1.15 },
];