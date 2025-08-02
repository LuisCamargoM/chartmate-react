import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

import DashboardScreen from '../screens/DashboardScreen';
import ChartScreen from '../screens/ChartScreen';
import MarketScreen from '../screens/MarketScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Chart') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Market') {
            iconName = focused ? 'pulse' : 'pulse-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.chartBull,
        tabBarInactiveTintColor: Colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: Colors.tabBarBackground,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: Colors.card,
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: Colors.foreground,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Portfolio' }}
      />
      <Tab.Screen 
        name="Chart" 
        component={ChartScreen}
        options={{ title: 'Charts' }}
      />
      <Tab.Screen 
        name="Market" 
        component={MarketScreen}
        options={{ title: 'Markets' }}
      />
    </Tab.Navigator>
  );
}