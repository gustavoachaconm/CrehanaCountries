import { useState, useRef } from 'react';
import type { VideoRef } from 'react-native-video';
import type { GestureResponderEvent } from 'react-native';
import type { VideoSource } from '../../domain/models';

export const useVideoPlayer = (source: VideoSource) => {
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seeking, setSeeking] = useState(false);

  const handlePlayPause = () => {
    if (source.isLive && paused) {
      if (videoRef.current) {
        videoRef.current.seek(0);
      }
    }
    setPaused(!paused);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };

  const handleSeek = (event: GestureResponderEvent) => {
    if (source.isLive || !duration) return;
    
    const { locationX } = event.nativeEvent;
    
    event.currentTarget.measure((x: number, y: number, width: number) => {
      const percentage = locationX / width;
      const seekTime = duration * percentage;
      
      setSeeking(true);
      setCurrentTime(seekTime);
      
      if (videoRef.current) {
        videoRef.current.seek(seekTime);
      }
    });
  };

  const handleProgress = (data: { currentTime: number }) => {
    if (!seeking) {
      setCurrentTime(data.currentTime);
    }
  };

  const handleLoad = (data: { duration: number }) => {
    setDuration(data.duration);
    setLoading(false);
    setError(null);
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleError = (e: { error?: { errorString?: string } }) => {
    setLoading(false);
    setError(e.error?.errorString || 'Error al cargar el video');
    console.error('Video error:', e);
  };

  const handleSeekComplete = () => {
    setSeeking(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
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
  };
};
