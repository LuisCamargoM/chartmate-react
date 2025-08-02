import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { queryClient } from './src/lib/queryClient';
import TabNavigator from './src/navigation/TabNavigator';
import { Colors } from './src/constants/Colors';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
          <StatusBar style="light" backgroundColor={Colors.background} />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
