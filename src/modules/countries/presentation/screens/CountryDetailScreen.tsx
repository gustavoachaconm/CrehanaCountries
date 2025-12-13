import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
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
  const allVideos = videoProvider.getAllVideos();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    Math.floor(Math.random() * allVideos.length)
  );

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? allVideos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev === allVideos.length - 1 ? 0 : prev + 1));
  };

  const currentVideo = allVideos[currentVideoIndex];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white p-6 mb-4 items-center">
        <Image
          source={{ uri: `https://flagcdn.com/w320/${country.code.toLowerCase()}.png` }}
          className="w-48 h-32 rounded-lg mb-4"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-gray-900 text-center">{country.name}</Text>
      </View>

      <View className="bg-white p-4 mb-4">
        <Text className="text-lg font-bold text-gray-900 mb-3 text-center">Información</Text>
        
        <View className="flex-row mb-3 px-6">
          <View className="flex-1 pr-2">
            <View className="mb-3">
              <Text className="text-sm font-semibold text-gray-700">Code:</Text>
              <Text className="text-base text-gray-900 font-bold">{country.code}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-sm font-semibold text-gray-700">Continent:</Text>
              <Text className="text-base text-gray-900 font-bold">{country.continent.name}</Text>
            </View>
          </View>

          <View className="flex-1 pl-2">
            {country.capital && (
              <View className="mb-3">
                <Text className="text-sm font-semibold text-gray-700">Capital:</Text>
                <Text className="text-base text-gray-900 font-bold">{country.capital}</Text>
              </View>
            )}

            {country.currency && (
              <View className="mb-3">
                <Text className="text-sm font-semibold text-gray-700">Currency:</Text>
                <Text className="text-base text-gray-900 font-bold">{country.currency}</Text>
              </View>
            )}
          </View>
        </View>

        <View className="mb-2 px-6">
          <Text className="text-sm font-semibold text-gray-700">Languages:</Text>
          {country.languages.map((lang) => (
            <Text key={lang.code} className="text-base text-gray-900 font-bold">
              • {lang.name}
            </Text>
          ))}
        </View>
      </View>

      <View className="bg-white p-4 mb-4">
        <Text className="text-lg font-bold text-gray-900 mb-3 text-center">Reproductor de video</Text>
        <VideoPlayer source={currentVideo} />
        
        <View className="flex-row items-center justify-center mt-4 mb-3">
          <TouchableOpacity
            className="bg-indigo-100 rounded-full w-12 h-12 items-center justify-center active:bg-indigo-200"
            onPress={handlePrevious}
            activeOpacity={0.7}
          >
            <Text className="text-indigo-600 text-2xl font-bold">‹</Text>
          </TouchableOpacity>
          
          <View className="mx-4 items-center">
            <Text className="text-gray-600 text-xs">
              {currentVideoIndex + 1} / {allVideos.length}
            </Text>
          </View>
          
          <TouchableOpacity
            className="bg-indigo-100 rounded-full w-12 h-12 items-center justify-center active:bg-indigo-200"
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text className="text-indigo-600 text-2xl font-bold">›</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-sm text-gray-600 mt-2">{currentVideo.title}</Text>
        {currentVideo.description && (
          <Text className="text-xs text-gray-500 mt-1">{currentVideo.description}</Text>
        )}
        <Text className="text-xs text-gray-400 mt-0.5">{currentVideo.uri}</Text>
      </View>
    </ScrollView>
  );
};
