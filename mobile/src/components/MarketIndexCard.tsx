import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { MarketIndex } from '../types';

interface MarketIndexCardProps {
  index: MarketIndex;
}

export default function MarketIndexCard({ index }: MarketIndexCardProps) {
  const isPositive = index.change >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{index.name}</Text>
        <View style={[styles.changeContainer, { backgroundColor: isPositive ? Colors.chartBull + '20' : Colors.chartBear + '20' }]}>
          <Ionicons 
            name={isPositive ? 'trending-up' : 'trending-down'} 
            size={12} 
            color={isPositive ? Colors.chartBull : Colors.chartBear} 
          />
          <Text style={[styles.changePercent, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
            {isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%
          </Text>
        </View>
      </View>
      
      <Text style={styles.value}>{index.value.toLocaleString()}</Text>
      
      <Text style={[styles.change, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
        {isPositive ? '+' : ''}{index.change.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.mutedForeground,
    flex: 1,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  changePercent: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
});