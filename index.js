/**
 * @format
 */

import { NativeWindStyleSheet } from 'nativewind'
import { AppRegistry } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';

NativeWindStyleSheet.setOutput({ default: 'native' })
AppRegistry.registerComponent(appName, () => App);
