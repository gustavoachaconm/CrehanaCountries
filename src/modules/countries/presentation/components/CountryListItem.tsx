import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import type { Country } from '../../domain/models';

interface CountryListItemProps {
  country: Country;
  onPress: (country: Country) => void;
}

export const CountryListItem: React.FC<CountryListItemProps> = ({ country, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-white p-4 mb-2 mx-4 rounded-lg shadow-sm border border-gray-200"
      onPress={() => onPress(country)}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">{country.name}</Text>
          <Text className="text-sm text-gray-600 mt-1">Código: {country.code}</Text>
          <Text className="text-sm text-gray-600">Continente: {country.continent.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
