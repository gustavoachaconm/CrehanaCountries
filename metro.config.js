const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');


const base = getDefaultConfig(__dirname);

const overrides = {
  // resolver: { /* ... */ },
  // transformer: { /* ... */ },
};

const merged = mergeConfig(base, overrides);

module.exports = withNativeWind(merged, { input: './global.css' });