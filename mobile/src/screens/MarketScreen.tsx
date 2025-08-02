import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { marketData, watchlistData, indices } from '../utils/stockData';
import StockCard from '../components/StockCard';
import MarketIndexCard from '../components/MarketIndexCard';

export default function MarketScreen() {
  const [activeTab, setActiveTab] = useState('stocks');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'stocks' && styles.activeTab]}
            onPress={() => setActiveTab('stocks')}
          >
            <Ionicons 
              name="trending-up" 
              size={16} 
              color={activeTab === 'stocks' ? Colors.primaryForeground : Colors.mutedForeground} 
            />
            <Text style={[
              styles.tabText,
              activeTab === 'stocks' && styles.activeTabText
            ]}>
              Top Stocks
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'watchlist' && styles.activeTab]}
            onPress={() => setActiveTab('watchlist')}
          >
            <Ionicons 
              name="eye" 
              size={16} 
              color={activeTab === 'watchlist' ? Colors.primaryForeground : Colors.mutedForeground} 
            />
            <Text style={[
              styles.tabText,
              activeTab === 'watchlist' && styles.activeTabText
            ]}>
              Watchlist
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stock Lists */}
        <View style={styles.section}>
          {activeTab === 'stocks' ? (
            <View>
              <Text style={styles.listTitle}>Market Movers</Text>
              {marketData.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </View>
          ) : (
            <View>
              <Text style={styles.listTitle}>Your Watchlist</Text>
              {watchlistData.map((stock) => (
                <StockCard 
                  key={stock.symbol} 
                  stock={stock}
                  onPress={() => {
                    // Handle stock selection
                    console.log('Selected stock:', stock.symbol);
                  }}
                />
              ))}
            </View>
          )}
        </View>

        {/* Market Status */}
        <View style={styles.section}>
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusText}>Market Open</Text>
            </View>
            <Text style={styles.statusTime}>NYSE: 9:30 AM - 4:00 PM EST</Text>
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
  indexList: {
    paddingHorizontal: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.mutedForeground,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  activeTabText: {
    color: Colors.primaryForeground,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  statusCard: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.chartBull,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.foreground,
  },
  statusTime: {
    fontSize: 14,
    color: Colors.mutedForeground,
  },
});