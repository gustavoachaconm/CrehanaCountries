import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountryListScreen } from '../../modules/countries/presentation/screens/CountryListScreen';
import { CountryDetailScreen } from '../../modules/countries/presentation/screens/CountryDetailScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CountryList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4b22f4',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="CountryList"
          component={CountryListScreen}
          options={{ title: 'Países' }}
        />
        <Stack.Screen
          name="CountryDetail"
          component={CountryDetailScreen}
          options={{ title: 'Detalles del país' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
