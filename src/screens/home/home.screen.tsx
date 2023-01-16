import { FC, useCallback } from 'react';
import { Button, Text } from 'react-native';
import { CenterView } from '@/components';
import { ScreenProps } from '../types';
import { ScreenName } from '../enums';

export const HomeScreen: FC<ScreenProps> = ({ navigation }) => {
  const onPress = useCallback(() => {
    navigation.navigate(ScreenName.OnBoarding);
  }, [navigation]);

  return (
    <CenterView>
      <Text>HOME</Text>
      <Button title="온보딩 페이지로 이동" onPress={onPress} />
    </CenterView>
  );
};
