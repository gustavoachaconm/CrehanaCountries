import type { VideoSource } from '../../domain/models';

const HLS_VIDEOS: VideoSource[] = [
  {
    uri: 'https://www.bloomberg.com/media-manifest/streams/us.m3u8',
    title: 'Bloomberg TV',
    description: 'Noticias financieras y de negocios en vivo.',
    isLive: true,
  },
  {
    uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    title: 'Tears of Steel',
    description: 'Cortometraje de ciencia ficción en alta calidad.',
  },
  {
    uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    title: 'Big Buck Bunny',
    description: 'Película animada de demostración.',
  },
];

export const videoProvider = {
  getRandomVideo(): VideoSource {
    const randomIndex = Math.floor(Math.random() * HLS_VIDEOS.length);
    return HLS_VIDEOS[randomIndex];
  },

  getAllVideos(): VideoSource[] {
    return HLS_VIDEOS;
  },
};
