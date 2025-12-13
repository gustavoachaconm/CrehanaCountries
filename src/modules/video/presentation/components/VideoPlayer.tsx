import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import type { VideoSource } from '../../domain/models';

interface VideoPlayerProps {
  source: VideoSource;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const videoRef = useRef<any>(null);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlayPause = () => {
    if (source.isLive && paused) {
      if (videoRef.current) {
        videoRef.current.seek(0);
      }
    }
    setPaused(!paused);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View className="bg-black rounded-xl overflow-hidden shadow-lg">
      <Video
        ref={videoRef}
        source={{ uri: source.uri }}
        style={styles.video}
        paused={paused}
        resizeMode="cover"
        onProgress={(data) => setCurrentTime(data.currentTime)}
        onLoad={(data) => {
          setDuration(data.duration);
          setLoading(false);
          setError(null);
        }}
        onLoadStart={() => setLoading(true)}
        onError={(e) => {
          setLoading(false);
          setError(e.error?.errorString || 'Error al cargar el video');
          console.error('Video error:', e);
        }}
      />

      {source.isLive && (
        <View className="absolute top-3 left-3 bg-red-600 px-3 py-1.5 rounded-full flex-row items-center">
          <View className="w-2 h-2 bg-white rounded-full mr-2" />
          <Text className="text-white text-xs font-bold">EN VIVO</Text>
        </View>
      )}

      {loading && (
        <View className="absolute inset-0 items-center justify-center bg-black/50">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-white mt-3 font-semibold">Cargando video...</Text>
        </View>
      )}

      {error && (
        <View className="absolute inset-0 items-center justify-center bg-black/90">
          <Text className="text-red-400 text-center px-6 text-sm">Error: {error}</Text>
        </View>
      )}

      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        {!source.isLive && (
          <View className="mb-2">
            <View className="bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
              <View
                className="bg-indigo-500 h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        )}
        
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="bg-indigo-600 rounded-full w-12 h-12 items-center justify-center shadow-lg active:bg-indigo-700"
            onPress={handlePlayPause}
            disabled={loading || !!error}
            activeOpacity={0.8}
          >
            <Text className="text-white text-xl font-bold">
              {paused ? '▶' : '❚❚'}
            </Text>
          </TouchableOpacity>

          {!source.isLive && (
            <Text className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 240,
  },
});
