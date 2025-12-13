import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountryListScreen } from '../../modules/countries/presentation/screens/CountryListScreen';
import { CountryDetailScreen } from '../../modules/countries/presentation/screens/CountryDetailScreen';
import { CustomBackButton } from '../components/BackButton';
import type { RootStackParamList } from './types';
import { colors } from '../config/theme';
import { strings } from '../config/i18n';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CountryList"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="CountryList"
          component={CountryListScreen}
          options={{ title: strings.countries.title }}
        />
        <Stack.Screen
          name="CountryDetail"
          component={CountryDetailScreen}
          options={{ 
            title: strings.countries.detailTitle,
            headerLeft: (props) => <CustomBackButton {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
