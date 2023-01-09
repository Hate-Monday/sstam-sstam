import { FC } from 'react';
import { Text, View } from 'react-native';
import { homeViewStyles } from './home.view.styles';

const HomeView: FC = () => {
  return (
    <View style={homeViewStyles.sectionContainer}>
      <Text>HOME</Text>
    </View>
  );
};

export default HomeView;
