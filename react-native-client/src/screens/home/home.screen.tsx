import { FC } from 'react';
import { Button, Text, View } from 'react-native';
import { ScreenProps } from '../types';

export const HomeScreen: FC<ScreenProps> = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>HOME</Text>
      <Button onPress={() => console.log(1)} title={'1'} />
    </View>
  );
};
