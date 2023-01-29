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

export const Main: FC = () => {
  const { barStyle, backgroundColor } = appStore.useInitTheme();

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [showCamera, setShowCamera] = useState(true);
  const [photos, setPhotos] = useState([]);

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
    setPhotos([...photos, photo]);
    setShowCamera(false);
    const fileName = photo.path.split('mrousavy')[1];
    await RNFS.moveFile(`/${photo.path}`, `${RNFS.PicturesDirectoryPath}/${fileName}.jpg`).then(
      () => console.log('Image Moved', `${fileName}`, '-- to --', `${RNFS.PicturesDirectoryPath}`),
    );
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  if (device == null) {
    return <ActivityIndicator size={20} color={'red'} />;
  }

  return (
    <>
      {device && showCamera && (
        <Camera style={StyleSheet.absoluteFill} isActive video photo device={device} ref={camera} />
      )}
      {showCamera && (
        <View style={styles.area}>
          <TouchableOpacity style={styles.camButton} onPress={onPressButton}>
            <Text></Text>
          </TouchableOpacity>
        </View>
      )}

      {photos && photos.length > 0 && (
        <View style={{ width: '100%', height: '100%' }}>
          {photos.map((photo, index) => (
            <View key={index}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: 'file://' + photo.path }}
              />
            </View>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
