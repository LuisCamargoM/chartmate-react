import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { generateStockData } from '../utils/stockData';

const screenWidth = Dimensions.get('window').width;

const timeRanges = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
];

export default function ChartScreen() {
  const [selectedRange, setSelectedRange] = useState('1M');
  const [symbol, setSymbol] = useState('AAPL');
  
  const range = timeRanges.find(r => r.label === selectedRange) || timeRanges[2];
  const data = generateStockData(range.days);
  
  const currentPrice = data[data.length - 1]?.price || 0;
  const previousPrice = data[data.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100);
  const isPositive = priceChange >= 0;

  const chartData = {
    labels: data.slice(-7).map(d => d.time.split('/')[1] + '/' + d.time.split('/')[2]), // Show last 7 data points
    datasets: [{
      data: data.slice(-7).map(d => d.price),
      color: () => isPositive ? Colors.chartBull : Colors.chartBear,
      strokeWidth: 2,
    }]
  };

  const chartConfig = {
    backgroundColor: Colors.card,
    backgroundGradientFrom: Colors.card,
    backgroundGradientTo: Colors.card,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(229, 231, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: isPositive ? Colors.chartBull : Colors.chartBear,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: Colors.border,
      strokeWidth: 1,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Stock Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.symbol}>{symbol}</Text>
            <Text style={styles.price}>${currentPrice.toFixed(2)}</Text>
            <View style={styles.changeContainer}>
              <Ionicons 
                name={isPositive ? 'trending-up' : 'trending-down'} 
                size={16} 
                color={isPositive ? Colors.chartBull : Colors.chartBear} 
              />
              <Text style={[styles.change, { color: isPositive ? Colors.chartBull : Colors.chartBear }]}>
                {isPositive ? '+' : ''}${priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
              </Text>
            </View>
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.rangeSelector}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range.label}
              style={[
                styles.rangeButton,
                selectedRange === range.label && styles.activeRangeButton
              ]}
              onPress={() => setSelectedRange(range.label)}
            >
              <Text style={[
                styles.rangeButtonText,
                selectedRange === range.label && styles.activeRangeButtonText
              ]}>
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={true}
            withHorizontalLines={true}
          />
        </View>

        {/* Stock Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Day's Range</Text>
            <Text style={styles.detailValue}>
              ${Math.min(...data.slice(-1)).toFixed(2)} - ${Math.max(...data.slice(-1)).toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Volume</Text>
            <Text style={styles.detailValue}>
              {(data[data.length - 1]?.volume || 0).toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Market Cap</Text>
            <Text style={styles.detailValue}>$2.89T</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>P/E Ratio</Text>
            <Text style={styles.detailValue}>28.14</Text>
          </View>
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
  header: {
    padding: 16,
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginVertical: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeRangeButton: {
    backgroundColor: Colors.primary,
  },
  rangeButtonText: {
    color: Colors.mutedForeground,
    fontWeight: '600',
    fontSize: 14,
  },
  activeRangeButtonText: {
    color: Colors.primaryForeground,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  chart: {
    borderRadius: 16,
  },
  detailsContainer: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.mutedForeground,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.foreground,
  },
});