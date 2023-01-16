import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenName } from './enums';
import { HomeScreen } from './home';
import { OnBoardingScreen } from './on-boarding';
import { NavigationStack } from './stack';

export const NavigationScreens: FC = () => {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator initialRouteName={ScreenName.Home}>
        <NavigationStack.Screen
          name={ScreenName.OnBoarding}
          component={OnBoardingScreen}
          options={{ title: '온보딩' }}
        />
        <NavigationStack.Screen
          name={ScreenName.Home}
          component={HomeScreen}
          options={{ title: '홈' }}
        />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};
