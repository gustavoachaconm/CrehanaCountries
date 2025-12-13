import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';
import type { VideoSource } from '../../domain/models';
import { strings } from '../../../../core/config/i18n';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

interface VideoPlayerProps {
  source: VideoSource;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ source }) => {
  const {
    videoRef,
    paused,
    currentTime,
    duration,
    loading,
    error,
    seeking,
    progress,
    handlePlayPause,
    handleFullscreen,
    handleSeek,
    handleProgress,
    handleLoad,
    handleLoadStart,
    handleError,
    handleSeekComplete,
    formatTime,
  } = useVideoPlayer(source);

  return (
    <View className="bg-black rounded-xl overflow-hidden shadow-lg">
      <Video
        ref={videoRef}
        source={{ uri: source.uri }}
        style={styles.video}
        paused={paused}
        resizeMode="cover"
        onProgress={handleProgress}
        onLoad={handleLoad}
        onLoadStart={handleLoadStart}
        onError={handleError}
        onSeek={handleSeekComplete}
      />

      {source.isLive && (
        <View className="absolute top-3 left-3 bg-red-600 px-3 py-1.5 rounded-full flex-row items-center">
          <View className="w-2 h-2 bg-white rounded-full mr-2" />
          <Text className="text-white text-xs font-bold">{strings.video.live}</Text>
        </View>
      )}

      {(loading || seeking) && (
        <View className="absolute inset-0 items-center justify-center bg-black/50">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-white mt-3 font-semibold">{strings.common.loading}</Text>
        </View>
      )}

      {error && (
        <View className="absolute inset-0 items-center justify-center bg-black/90">
          <Text className="text-red-400 text-center px-6 text-sm">{strings.common.error}: {error}</Text>
        </View>
      )}

      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        {!source.isLive && (
          <TouchableWithoutFeedback onPress={handleSeek}>
            <View className="mb-2">
              <View className="bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                <View
                  className="bg-indigo-500 h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
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

          <View className="flex-row items-center gap-3">
            {!source.isLive && (
              <Text className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            )}
            
            <TouchableOpacity
              className="bg-gray-700/70 rounded-lg px-3 py-2 active:bg-gray-600"
              onPress={handleFullscreen}
              disabled={loading || !!error}
              activeOpacity={0.8}
            >
              <Text className="text-white text-xs font-bold">⛶</Text>
            </TouchableOpacity>
          </View>
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
