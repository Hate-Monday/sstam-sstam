import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenRootStackProps } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenName } from './enums';
import { HomeScreen } from './home';

const stack = createNativeStackNavigator<ScreenRootStackProps>();

export const NavigationScreens: FC = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName={ScreenName.HomeScreen}>
        <stack.Screen
          name={ScreenName.HomeScreen}
          component={HomeScreen}
          options={{ title: '홈' }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};
