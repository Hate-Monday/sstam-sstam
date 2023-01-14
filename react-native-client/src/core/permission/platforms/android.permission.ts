import { Alert, Linking } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { LOCATION_PERMISSION_MESSAGES } from './constants';
import { NotSupportCameraError } from './exceptions';
import { PermissionClassType } from './types';

export class AndroidPermission implements PermissionClassType {
  async check(): Promise<void> {
    await this.checkLocation();
    await this.checkCamera();
  }

  async checkLocation(): Promise<void> {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(...LOCATION_PERMISSION_MESSAGES, [
          {
            text: '네',
            onPress: Linking.openSettings,
          },
          {
            text: '아니오',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async checkCamera(): Promise<void> {
    try {
      const result = await check(PERMISSIONS.ANDROID.CAMERA);

      if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
        request(PERMISSIONS.ANDROID.CAMERA);
        return;
      }

      throw new NotSupportCameraError();
    } catch (e) {
      console.log(e);
    }
  }
}
