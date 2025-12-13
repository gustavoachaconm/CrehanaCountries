import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { apolloClient } from '../core/config/apolloClient';
import { AppNavigator } from '../core/navigation/AppNavigator';
import { ErrorBoundary } from '../core/components/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
