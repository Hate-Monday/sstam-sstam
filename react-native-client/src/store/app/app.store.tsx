import { Store } from '@/utils';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppStoreProps } from './types';

export class AppStore extends Store<AppStoreProps> {
  useInitTheme(): AppStoreProps {
    const [state, setState] = this.useState();
    const theme = useColorScheme();

    useEffect(() => {
      setState({
        theme,
        barStyle: theme === 'dark' ? 'dark-content' : 'light-content',
        backgroundColor: theme === 'dark' ? Colors.darker : Colors.lighter,
      });
    }, [theme, setState]);

    return state;
  }
}

export const appStore = new AppStore(AppStore.name, {
  theme: 'light',
  barStyle: 'light-content',
  backgroundColor: Colors.lighter,
});
