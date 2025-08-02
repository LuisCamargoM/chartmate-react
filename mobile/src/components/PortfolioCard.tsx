import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Portfolio } from '../types';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const totalValue = portfolio.shares * portfolio.currentPrice;
  const totalCost = portfolio.shares * portfolio.avgPrice;
  const gain = totalValue - totalCost;
  const gainPercent = ((gain / totalCost) * 100);
  const isPositive = gain >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{portfolio.symbol}</Text>
        <Text style={styles.shares}>{portfolio.shares} shares</Text>
      </View>
      
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Current Price</Text>
          <Text style={styles.value}>${portfolio.currentPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Avg Cost</Text>
          <Text style={styles.value}>${portfolio.avgPrice.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Market Value</Text>
          <Text style={styles.value}>${totalValue.toLocaleString()}</Text>
        </View>
        <View style={[styles.column, styles.gainColumn]}>
          <Text style={styles.label}>Gain/Loss</Text>
          <View style={styles.gainContainer}>
            <Ionicons 
              name={isPositive ? 'trending-up' : 'trending-down'} 
              size={16} 
              color={isPositive ? Colors.chartBull : Colors.chartBear} 
            />
            <Text style={[styles.gain, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
              {isPositive ? '+' : ''}${gain.toFixed(2)}
            </Text>
          </View>
          <Text style={[styles.gainPercent, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
            ({isPositive ? '+' : ''}{gainPercent.toFixed(2)}%)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  shares: {
    fontSize: 14,
    color: Colors.mutedForeground,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    flex: 1,
  },
  gainColumn: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    color: Colors.mutedForeground,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.foreground,
  },
  gainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gain: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  gainPercent: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});