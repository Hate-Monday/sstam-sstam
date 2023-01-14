import { useEffect } from 'react';
import { Platform } from 'react-native';
import { AndroidPermission, IosPermission } from './platforms';

export class Permission {
  private readonly ios = new IosPermission();
  private readonly android = new AndroidPermission();

  useCheck() {
    useEffect(() => {
      switch (Platform.OS) {
        case 'ios':
          this.ios.check();
          break;

        case 'android':
          this.android.check();
          break;
      }
    }, []);
  }
}

export const permission = new Permission();
