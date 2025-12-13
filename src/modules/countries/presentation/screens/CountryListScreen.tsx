import React, { useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCountries } from '../hooks/useCountries';
import { useFilterOptions } from '../hooks/useFilterOptions';
import { SearchBar } from '../components/SearchBar';
import { FilterPicker } from '../components/FilterPicker';
import { CountryListItem } from '../components/CountryListItem';
import type { Country } from '../../domain/models';
import type { RootStackParamList } from '../../../../core/navigation/types';
import { strings } from '../../../../core/config/i18n';

interface CountryListScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CountryList'>;
}

export const CountryListScreen: React.FC<CountryListScreenProps> = ({ navigation }) => {
  const {
    countries,
    isLoading,
    error,
    searchQuery,
    selectedContinent,
    selectedCurrency,
    setSearchQuery,
    setSelectedContinent,
    setSelectedCurrency,
  } = useCountries();

  const { continentOptions, currencyOptions } = useFilterOptions(selectedContinent, selectedCurrency);

  const handleCountryPress = useCallback((country: Country) => {
    navigation.navigate('CountryDetail', { country });
  }, [navigation]);

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-red-600 text-base">{strings.common.error}: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View className="flex-row px-2 py-2">
        <FilterPicker
          label={strings.countries.filters.continent}
          selectedValue={selectedContinent}
          options={continentOptions}
          onSelect={setSelectedContinent}
        />
        <FilterPicker
          label={strings.countries.filters.currency}
          selectedValue={selectedCurrency}
          options={currencyOptions}
          onSelect={setSelectedCurrency}
        />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-2">{strings.countries.loadingCountries}</Text>
        </View>
      ) : (
        <FlatList
          data={countries}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <CountryListItem country={item} onPress={handleCountryPress} />
          )}
          contentContainerClassName="py-2"
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-500 text-base">{strings.countries.noCountriesFound}</Text>
            </View>
          }
        />
      )}
    </View>
  );
};
