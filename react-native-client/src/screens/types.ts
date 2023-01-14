import { ParamListBase, StackNavigationState, TypedNavigator } from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ScreenName } from './enums';

export type NavigationStackMaps = TypedNavigator<
  ScreenRootStackProps,
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  ({
    id,
    initialRouteName,
    children,
    screenListeners,
    screenOptions,
    ...props
  }: NativeStackNavigatorProps) => JSX.Element
>;

export type ScreenRootStackProps = Record<ScreenName, undefined>;
export type ScreenProps = NativeStackScreenProps<ScreenRootStackProps, ScreenName>;
