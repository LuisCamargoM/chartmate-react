# ChartMate Mobile - React Native Trading App

A professional mobile trading platform built with React Native and Expo.

## Features

- **Portfolio Dashboard**: View total portfolio value, gains/losses, and holdings
- **Interactive Charts**: Real-time stock charts with multiple timeframes  
- **Market Overview**: Track market indices and top performing stocks
- **Watchlist**: Monitor your favorite stocks
- **Real-time Data**: Live market data and price updates

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Chart Kit** for interactive charts
- **React Query** for data fetching and caching
- **Expo Vector Icons** for UI icons

## Getting Started

1. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on device/simulator:
   - iOS: `npm run ios` (requires Mac)
   - Android: `npm run android`
   - Web: `npm run web`

## Project Structure

```
mobile/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Main application screens
│   ├── navigation/     # Navigation configuration
│   ├── constants/      # App constants and colors
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions and data
│   └── lib/            # Third-party library configurations
├── assets/             # Static assets (images, fonts)
└── App.tsx             # Main application component
```

## API Integration

The mobile app connects to the Express.js backend running on port 5000. Update the API_BASE_URL in `src/lib/queryClient.ts` to match your server configuration.

## Building for Production

```bash
# Build for Android
expo build:android

# Build for iOS (requires Apple Developer account)
expo build:ios
```