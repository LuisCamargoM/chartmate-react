export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface Portfolio {
  symbol: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface ChartData {
  time: string;
  price: number;
  volume: number;
}

export interface User {
  id: number;
  username: string;
}

export interface InsertUser {
  username: string;
  password: string;
}