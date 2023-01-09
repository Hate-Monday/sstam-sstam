import { FC } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { HomeView } from '@/views';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { appStore } from '@/store';

const App: FC = () => {
  const { barStyle, backgroundColor } = appStore.useInitTheme();

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor }}>
        <Header />
        <HomeView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
