import type { VideoSource } from '../../domain/models';

const HLS_VIDEOS: VideoSource[] = [
  {
    uri: 'https://ntv1.cs.andrews.edu/hls/nasatv.m3u8',
    title: 'NASA TV en Vivo',
    description: 'Transmisión pública oficial de la NASA las 24 horas.',
  },
  {
    uri: 'https://liveprodapnortheast.global.ssl.fastly.net/btv/desktop/us_live.m3u8',
    title: 'Bloomberg Global',
    description: 'Cobertura internacional de economía, finanzas y mercados.',
  },
  {
    uri: 'https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8',
    title: 'France 24 (Inglés)',
    description: 'Noticias globales en vivo emitidas por France 24.',
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
