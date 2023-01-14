import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStackMaps, ScreenRootStackProps } from './types';

export const NavigationStack: NavigationStackMaps =
  createNativeStackNavigator<ScreenRootStackProps>();
