export const strings = {
  common: {
    loading: 'Cargando...',
    error: 'Error',
    all: 'Todos',
  },
  countries: {
    title: 'Países',
    detailTitle: 'Detalles del país',
    searchPlaceholder: 'Buscar país por nombre...',
    noCountriesFound: 'No se encontraron países',
    loadingCountries: 'Cargando países...',
    connectionError: 'Error de conexión. Por favor, verifica tu red.',
    loadError: 'Error al cargar los países',
    filters: {
      continent: 'Continente',
      currency: 'Moneda',
    },
    fields: {
      code: 'Código:',
      continent: 'Continente:',
      capital: 'Capital:',
      currency: 'Moneda:',
      languages: 'Idiomas:',
    },
    sections: {
      information: 'Información',
      videoPlayer: 'Reproductor de video',
    },
  },
  video: {
    live: 'EN VIVO',
  },
} as const;
