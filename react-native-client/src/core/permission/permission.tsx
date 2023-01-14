import { useEffect } from 'react';
import { Platform } from 'react-native';
import { AndroidPermission, IosPermission } from './platforms';

export class Permission {
  useCheck() {
    useEffect(() => {
      switch (Platform.OS) {
        case 'android':
          new AndroidPermission().check();
          break;

        case 'ios':
          new IosPermission().check();
          break;
      }
    }, []);
  }
}

export const permission = new Permission();
