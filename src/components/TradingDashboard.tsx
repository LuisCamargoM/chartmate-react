import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, Activity, Eye, Star } from 'lucide-react';

const portfolio = [
  { symbol: 'AAPL', shares: 150, avgPrice: 175.32, currentPrice: 192.53 },
  { symbol: 'MSFT', shares: 100, avgPrice: 350.25, currentPrice: 378.85 },
  { symbol: 'GOOGL', shares: 75, avgPrice: 125.80, currentPrice: 138.21 },
];

const watchlist = [
  { symbol: 'NVDA', price: 429.89, change: 12.45, changePercent: 2.98 },
  { symbol: 'AMD', price: 98.74, change: -2.31, changePercent: -2.29 },
  { symbol: 'META', price: 352.89, change: 8.12, changePercent: 2.35 },
  { symbol: 'NFLX', price: 486.23, change: -5.67, changePercent: -1.15 },
];

const TradingDashboard = () => {
  const [orderType, setOrderType] = useState('market');
  const [orderSide, setOrderSide] = useState('buy');

  const portfolioValue = portfolio.reduce((total, stock) => {
    return total + (stock.shares * stock.currentPrice);
  }, 0);

  const portfolioGain = portfolio.reduce((total, stock) => {
    return total + (stock.shares * (stock.currentPrice - stock.avgPrice));
  }, 0);

  const portfolioGainPercent = ((portfolioGain / (portfolioValue - portfolioGain)) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Portfolio Value</span>
            </div>
            <div className="text-2xl font-mono font-bold">
              ${portfolioValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Gain/Loss</span>
            </div>
            <div className={`text-2xl font-mono font-bold ${portfolioGain >= 0 ? 'text-chart-bull' : 'text-chart-bear'}`}>
              {portfolioGain >= 0 ? '+' : ''}${portfolioGain.toLocaleString()}
            </div>
            <div className={`text-sm font-mono ${portfolioGain >= 0 ? 'text-chart-bull' : 'text-chart-bear'}`}>
              ({portfolioGainPercent}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Day's Gain</span>
            </div>
            <div className="text-2xl font-mono font-bold text-chart-bull">
              +$1,234.56
            </div>
            <div className="text-sm font-mono text-chart-bull">
              (+0.87%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Buying Power</span>
            </div>
            <div className="text-2xl font-mono font-bold">
              $25,430.19
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio & Watchlist */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>My Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {portfolio.map((stock) => {
                      const totalValue = stock.shares * stock.currentPrice;
                      const gain = stock.shares * (stock.currentPrice - stock.avgPrice);
                      const gainPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice * 100).toFixed(2);
                      const isPositive = gain >= 0;
                      
                      return (
                        <div key={stock.symbol} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                          <div>
                            <div className="font-semibold">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">
                              {stock.shares} shares @ ${stock.avgPrice.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-semibold">
                              ${totalValue.toLocaleString()}
                            </div>
                            <div className={`text-sm font-mono ${isPositive ? 'text-chart-bull' : 'text-chart-bear'}`}>
                              {isPositive ? '+' : ''}${gain.toFixed(2)} ({gainPercent}%)
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="watchlist">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {watchlist.map((stock) => {
                      const isPositive = stock.change >= 0;
                      
                      return (
                        <div key={stock.symbol} className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-right">
                            <div className="font-mono font-semibold">
                              ${stock.price.toFixed(2)}
                            </div>
                            <div className={`text-sm font-mono flex items-center gap-1 ${isPositive ? 'text-chart-bull' : 'text-chart-bear'}`}>
                              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Trading Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="symbol">Symbol</Label>
                <Input id="symbol" placeholder="AAPL" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={orderSide === 'buy' ? 'default' : 'outline'}
                  onClick={() => setOrderSide('buy')}
                  className={orderSide === 'buy' ? 'bg-chart-bull hover:bg-chart-bull/90' : ''}
                >
                  Buy
                </Button>
                <Button
                  variant={orderSide === 'sell' ? 'default' : 'outline'}
                  onClick={() => setOrderSide('sell')}
                  className={orderSide === 'sell' ? 'bg-chart-bear hover:bg-chart-bear/90' : ''}
                >
                  Sell
                </Button>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="100" />
              </div>

              <div>
                <Label htmlFor="orderType">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="stop">Stop Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {orderType === 'limit' && (
                <div>
                  <Label htmlFor="limitPrice">Limit Price</Label>
                  <Input id="limitPrice" type="number" step="0.01" placeholder="0.00" />
                </div>
              )}

              <Button className="w-full" size="lg">
                Place {orderSide.charAt(0).toUpperCase() + orderSide.slice(1)} Order
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                Estimated cost: $0.00<br />
                Commission: $0.00
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;