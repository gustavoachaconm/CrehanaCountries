import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import type { Country } from '../../domain/models';
import { VideoPlayer } from '../../../video/presentation/components/VideoPlayer';
import { videoProvider } from '../../../video/data/providers/videoProvider';

interface CountryDetailScreenProps {
  route: {
    params: {
      country: Country;
    };
  };
}

export const CountryDetailScreen: React.FC<CountryDetailScreenProps> = ({ route }) => {
  const { country } = route.params;
  const videoSource = videoProvider.getRandomVideo();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white p-4 mb-4">
        <Text className="text-2xl font-bold text-gray-900 mb-2">{country.name}</Text>
      </View>

      <View className="bg-white p-4 mb-4">
        <Text className="text-lg font-bold text-gray-900 mb-3">Information</Text>
        
        <View className="mb-2">
          <Text className="text-sm font-semibold text-gray-700">Code</Text>
          <Text className="text-base text-gray-900">{country.code}</Text>
        </View>

        <View className="mb-2">
          <Text className="text-sm font-semibold text-gray-700">Continent</Text>
          <Text className="text-base text-gray-900">{country.continent.name}</Text>
        </View>

        {country.capital && (
          <View className="mb-2">
            <Text className="text-sm font-semibold text-gray-700">Capital</Text>
            <Text className="text-base text-gray-900">{country.capital}</Text>
          </View>
        )}

        {country.currency && (
          <View className="mb-2">
            <Text className="text-sm font-semibold text-gray-700">Currency</Text>
            <Text className="text-base text-gray-900">{country.currency}</Text>
          </View>
        )}

        <View className="mb-2">
          <Text className="text-sm font-semibold text-gray-700">Languages</Text>
          {country.languages.map((lang) => (
            <Text key={lang.code} className="text-base text-gray-900">
              • {lang.name}
            </Text>
          ))}
        </View>
      </View>

      <View className="bg-white p-4 mb-4">
        <Text className="text-lg font-bold text-gray-900 mb-3">Featured Video</Text>
        <VideoPlayer source={videoSource} />
        <Text className="text-sm text-gray-600 mt-2">{videoSource.title}</Text>
        {videoSource.description && (
          <Text className="text-xs text-gray-500 mt-1">{videoSource.description}</Text>
        )}
      </View>
    </ScrollView>
  );
};
