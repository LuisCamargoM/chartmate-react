import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Generate realistic stock data
const generateStockData = (days: number) => {
  const data = [];
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

const timeRanges = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
];

const StockChart = () => {
  const [data, setData] = useState(generateStockData(30));
  const [selectedRange, setSelectedRange] = useState('1M');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const currentPrice = data[data.length - 1]?.price || 0;
  const previousPrice = data[data.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  useEffect(() => {
    const range = timeRanges.find(r => r.label === selectedRange);
    if (range) {
      setData(generateStockData(range.days));
    }
  }, [selectedRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">
            Price: <span className="font-mono">${payload[0].value.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = chartType === 'area' ? AreaChart : LineChart;
  const DataComponent = chartType === 'area' ? (
    <Area
      type="monotone"
      dataKey="price"
      stroke="hsl(var(--chart-bull))"
      fill="url(#colorGradient)"
      strokeWidth={2}
    />
  ) : (
    <Line
      type="monotone"
      dataKey="price"
      stroke="hsl(var(--chart-bull))"
      strokeWidth={2}
      dot={false}
    />
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-2xl font-bold">AAPL</CardTitle>
          <p className="text-muted-foreground">Apple Inc.</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold">
            ${currentPrice.toFixed(2)}
          </div>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-chart-bull' : 'text-chart-bear'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="font-mono">
              {isPositive ? '+' : ''}${priceChange.toFixed(2)} ({percentChange}%)
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex gap-2 mb-4">
          {timeRanges.map((range) => (
            <Button
              key={range.label}
              variant={selectedRange === range.label ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRange(range.label)}
            >
              {range.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            variant={chartType === 'area' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('area')}
          >
            Area
          </Button>
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
          >
            Line
          </Button>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={data}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-bull))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-bull))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--chart-grid))"
                opacity={0.3}
              />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--chart-axis))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--chart-axis))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              {DataComponent}
            </ChartComponent>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Market Cap</p>
            <p className="font-mono font-semibold">$2.8T</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">P/E Ratio</p>
            <p className="font-mono font-semibold">28.7</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">52W High</p>
            <p className="font-mono font-semibold">$234.82</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">52W Low</p>
            <p className="font-mono font-semibold">$164.08</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;