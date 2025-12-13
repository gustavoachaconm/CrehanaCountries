import React, { useState, useMemo } from 'react';
import { TouchableOpacity, Text, View, Image, ActivityIndicator } from 'react-native';
import type { Country } from '../../domain/models';
import { getFlagUrl } from '../utils/flagUtils';

interface CountryListItemProps {
  country: Country;
  onPress: (country: Country) => void;
}

export const CountryListItem = React.memo<CountryListItemProps>(({ country, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUri = useMemo(() => {
    return getFlagUrl(country.code, 160);
  }, [country.code]);
  
  return (
    <TouchableOpacity
      className="bg-white p-4 mb-2 mx-4 rounded-lg shadow-sm border border-gray-200"
      onPress={() => onPress(country)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalles de ${country.name}`}
      accessibilityHint={`Abre información detallada sobre ${country.name}`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-bold text-gray-900">{country.name}</Text>
          <Text className="text-sm text-gray-600 mt-1">Código: <Text className="font-bold">{country.code}</Text></Text>
          <Text className="text-sm text-gray-600">Continente: <Text className="font-bold">{country.continent.name}</Text></Text>
        </View>
        <View className="w-24 h-16 rounded-lg bg-gray-200 items-center justify-center overflow-hidden">
          {imageLoading && !imageError && (
            <ActivityIndicator size="small" color="#6366f1" />
          )}
          {imageError && (
            <Text className="text-gray-400 text-xs">Sin imagen</Text>
          )}
          <Image
            source={{ uri: imageUri }}
            className="w-24 h-16 rounded-lg absolute"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
            accessibilityLabel={`Bandera de ${country.name}`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});
