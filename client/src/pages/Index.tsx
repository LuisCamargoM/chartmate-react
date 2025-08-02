import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StockChart from '@/components/StockChart';
import MarketOverview from '@/components/MarketOverview';
import TradingDashboard from '@/components/TradingDashboard';
import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ChartMate</h1>
                <p className="text-xs text-muted-foreground">Professional Trading</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-chart-bull/10 text-chart-bull border-chart-bull">
                Market Open
              </Badge>
              <div className="text-sm font-mono">
                <span className="text-muted-foreground">NYSE:</span> 9:30 AM - 4:00 PM EST
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Chart
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Market
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <TradingDashboard />
          </TabsContent>

          <TabsContent value="chart">
            <StockChart />
          </TabsContent>

          <TabsContent value="market">
            <MarketOverview />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 ChartMate. Professional trading platform.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Real-time data</span>
              <span>•</span>
              <span>Advanced charting</span>
              <span>•</span>
              <span>Portfolio management</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
