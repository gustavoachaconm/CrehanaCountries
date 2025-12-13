jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));


jest.mock('react-native-video', () => 'Video');


jest.mock('nativewind', () => ({
  styled: (component) => component,
}));


jest.setTimeout(10000);
