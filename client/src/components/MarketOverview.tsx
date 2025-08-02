import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

const marketData = [
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

const indices = [
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

const MarketOverview = () => {
  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <Card>
        <CardHeader>
          <CardTitle>Market Indices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {indices.map((index) => {
              const isPositive = index.change >= 0;
              return (
                <div key={index.name} className="p-4 bg-accent rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{index.name}</h3>
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-chart-bull" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-chart-bear" />
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-mono font-bold">
                      {index.value.toLocaleString()}
                    </div>
                    <div className={`text-sm font-mono ${isPositive ? 'text-chart-bull' : 'text-chart-bear'}`}>
                      {isPositive ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Stocks */}
      <Card>
        <CardHeader>
          <CardTitle>Top Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketData.map((stock) => {
              const isPositive = stock.change >= 0;
              return (
                <div key={stock.symbol} className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">
                        {stock.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className={`text-sm font-mono flex items-center gap-1 ${isPositive ? 'text-chart-bull' : 'text-chart-bear'}`}>
                      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {isPositive ? '+' : ''}${stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;