import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenName } from './enums';

export type ScreenRootStackProps = Record<ScreenName, undefined>;
export type ScreenProps = NativeStackScreenProps<ScreenRootStackProps, ScreenName>;
