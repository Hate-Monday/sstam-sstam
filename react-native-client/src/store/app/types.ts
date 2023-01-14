import { ColorSchemeName, StatusBarStyle } from 'react-native';

export type AppStoreProps = {
  theme: ColorSchemeName;
  barStyle: StatusBarStyle;
  backgroundColor: string;
};
