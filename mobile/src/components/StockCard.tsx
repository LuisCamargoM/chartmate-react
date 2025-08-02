import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Stock } from '../types';

interface StockCardProps {
  stock: Stock;
  onPress?: () => void;
}

export default function StockCard({ stock, onPress }: StockCardProps) {
  const isPositive = stock.change >= 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.symbol}>{stock.symbol}</Text>
          <Text style={styles.name}>{stock.name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
          <View style={[styles.changeContainer, { backgroundColor: isPositive ? Colors.chartBull + '20' : Colors.chartBear + '20' }]}>
            <Ionicons 
              name={isPositive ? 'trending-up' : 'trending-down'} 
              size={12} 
              color={isPositive ? Colors.chartBull : Colors.chartBear} 
            />
            <Text style={[styles.change, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  name: {
    fontSize: 14,
    color: Colors.mutedForeground,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});