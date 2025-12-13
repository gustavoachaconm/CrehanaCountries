import { useMemo, useState, useCallback } from 'react';
import { videoProvider } from '../../../video/data/providers/videoProvider';

export const useVideoNavigation = () => {
  const allVideos = useMemo(() => videoProvider.getAllVideos(), []);
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(() =>
    Math.floor(Math.random() * allVideos.length)
  );

  const handlePrevious = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev === 0 ? allVideos.length - 1 : prev - 1));
  }, [allVideos.length]);

  const handleNext = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev === allVideos.length - 1 ? 0 : prev + 1));
  }, [allVideos.length]);

  const currentVideo = allVideos[currentVideoIndex];

  return {
    currentVideo,
    currentVideoIndex,
    totalVideos: allVideos.length,
    handlePrevious,
    handleNext,
  };
};
