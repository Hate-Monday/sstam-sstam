import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';
import { appStore } from './store';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
  CameraRuntimeError,
} from 'react-native-vision-camera';
import { PermissionsAndroid } from 'react-native';
import RNFS, { PicturesDirectoryPath } from 'react-native-fs';
import Widget from './widget/widget';
import ViewShot, { captureScreen } from 'react-native-view-shot';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenCapture } from 'react-screen-capture';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Main: FC = () => {
  const { barStyle, backgroundColor } = appStore.useInitTheme();

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [showCamera, setShowCamera] = useState(true);
  const [photos, setPhotos] = useState([]);
  const captureRef = useRef();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, [cameraPermission, microphonePermission]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onPressButton = async () => {
    if (!camera.current) return;
    const photo = await camera.current.takePhoto({
      flash: 'on',
      qualityPrioritization: 'speed',
    });
    console.log(photo, 'photo');
    setShowCamera(false);
    setPhotos([...photos, photo]);
    setTimeout(() => {
      onCapture();
    }, 500);
  };

  const getPhotoUri = async (): Promise<string> => {
    const uri = await captureRef?.current?.capture();
    console.log('👂👂 Image saved to', uri);
    return uri;
  };

  const onCapture = async () => {
    try {
      const uri = await getPhotoUri();
      const path = uri.split('file://')[1];
      const fileName = uri.split('ReactNative-snapshot-image')[1];
      await RNFS.moveFile(`/${path}`, `${RNFS.PicturesDirectoryPath}/${fileName}`).then(() =>
        console.log('Image Moved', `${fileName}`, '-- to --', `${RNFS.PicturesDirectoryPath}`),
      );
    } catch (e) {
      console.log('😻😻😻 snapshot failed', e);
    }
  };

  useEffect(() => {
    if (photos && photos.length > 0 && !showCamera) {
      onCapture();
    }
  }, [photos]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (device == null) {
    return <ActivityIndicator size={20} color={'red'} />;
  }

  return (
    <>
      {device && showCamera && (
        <>
          <Camera style={styles.camera} isActive video photo device={device} ref={camera} />
          <Widget />
        </>
      )}
      {showCamera && (
        <View style={styles.area}>
          <TouchableOpacity style={styles.camButton} onPress={onPressButton}></TouchableOpacity>
        </View>
      )}

      {photos && photos.length > 0 && (
        <>
          <ViewShot
            ref={captureRef}
            style={styles.wrapper}
            options={{ format: 'jpg', quality: 0.9 }}
          >
            <View style={{ width: '100%', height: '100%' }}>
              {photos.map((photo, index) => (
                <View key={index}>
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: 'file://' + photo.path }}
                  />
                  <Widget />
                </View>
              ))}
            </View>
          </ViewShot>
          <View style={styles.area}>
            <TouchableOpacity style={styles.camButton} onPress={onCapture}></TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  camera: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    color: 'blue',
  },
  area: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
  },
  camButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#e34077',
    elevation: 6,
  },
});
