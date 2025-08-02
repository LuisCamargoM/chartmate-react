import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { portfolioData, indices } from '../utils/stockData';
import PortfolioCard from '../components/PortfolioCard';
import MarketIndexCard from '../components/MarketIndexCard';

export default function DashboardScreen() {
  const portfolioValue = portfolioData.reduce((total, stock) => {
    return total + (stock.shares * stock.currentPrice);
  }, 0);

  const portfolioGain = portfolioData.reduce((total, stock) => {
    return total + (stock.shares * (stock.currentPrice - stock.avgPrice));
  }, 0);

  const portfolioGainPercent = ((portfolioGain / (portfolioValue - portfolioGain)) * 100);
  const isPositive = portfolioGain >= 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Portfolio Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfolio Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <View style={styles.summaryHeader}>
                  <Ionicons name="wallet" size={16} color={Colors.primary} />
                  <Text style={styles.summaryLabel}>Total Value</Text>
                </View>
                <Text style={styles.summaryValue}>${portfolioValue.toLocaleString()}</Text>
              </View>
              
              <View style={styles.summaryItem}>
                <View style={styles.summaryHeader}>
                  <Ionicons 
                    name={isPositive ? 'trending-up' : 'trending-down'} 
                    size={16} 
                    color={isPositive ? Colors.chartBull : Colors.chartBear} 
                  />
                  <Text style={styles.summaryLabel}>Total Gain/Loss</Text>
                </View>
                <Text style={[styles.summaryValue, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
                  {isPositive ? '+' : ''}${portfolioGain.toLocaleString()}
                </Text>
                <Text style={[styles.summaryPercent, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
                  ({isPositive ? '+' : ''}{portfolioGainPercent.toFixed(2)}%)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Market Indices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Indices</Text>
          <FlatList
            data={indices}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <MarketIndexCard index={item} />}
            contentContainerStyle={styles.indexList}
          />
        </View>

        {/* Portfolio Holdings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Holdings</Text>
          {portfolioData.map((portfolio, index) => (
            <PortfolioCard key={portfolio.symbol} portfolio={portfolio} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.mutedForeground,
    marginLeft: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  summaryPercent: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  indexList: {
    paddingHorizontal: 8,
  },
});