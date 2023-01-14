import { FC } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { appStore } from './store';
import { NavigationScreens } from './screens';

export const Main: FC = () => {
  const { barStyle, backgroundColor } = appStore.useInitTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <NavigationScreens />
    </SafeAreaView>
  );
};
