import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import { appStore } from './store';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
  CameraRuntimeError,
} from 'react-native-vision-camera';
import { PermissionsAndroid } from 'react-native';

export const Main: FC = () => {
  const { barStyle, backgroundColor } = appStore.useInitTheme();

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

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
      {device && (
        <Camera style={StyleSheet.absoluteFill} isActive photo device={device} ref={camera} />
      )}
    </>
  );
};
