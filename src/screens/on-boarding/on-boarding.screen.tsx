import { FC, useCallback } from 'react';
import { Button, Text } from 'react-native';
import { CenterView } from '@/components';
import { ScreenProps } from '../types';
import { ScreenName } from '../enums';
import { permission } from '@/core';

export const OnBoardingScreen: FC<ScreenProps> = ({ navigation }) => {
  permission.useCheck();

  const onPress = useCallback(() => {
    navigation.navigate(ScreenName.Home);
  }, [navigation]);

  return (
    <CenterView>
      <Text>ON-BOARDING</Text>
      <Button title="홈으로 이동" onPress={onPress} />
    </CenterView>
  );
};
