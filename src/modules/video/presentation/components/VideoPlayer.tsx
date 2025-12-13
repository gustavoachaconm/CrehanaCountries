import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import type { VideoSource } from '../../domain/models';

interface VideoPlayerProps {
  source: VideoSource;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View className="bg-black rounded-lg overflow-hidden">
      <Video
        ref={videoRef}
        source={{ uri: source.uri }}
        style={styles.video}
        paused={paused}
        resizeMode="contain"
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

      {loading && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-2">Cargando video...</Text>
        </View>
      )}

      {error && (
        <View className="absolute inset-0 items-center justify-center bg-black/80">
          <Text className="text-red-400 text-center px-4">Error: {error}</Text>
        </View>
      )}

      <View className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="bg-white/90 rounded-full w-10 h-10 items-center justify-center"
            onPress={handlePlayPause}
            disabled={loading || !!error}
          >
            <Text className="text-black text-base font-bold">
              {paused ? '▶' : '⏸'}
            </Text>
          </TouchableOpacity>

          <View className="flex-1 mx-3">
            <View className="bg-gray-600 h-1 rounded-full">
              <View
                className="bg-blue-500 h-1 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>

          <Text className="text-white text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
  },
});
