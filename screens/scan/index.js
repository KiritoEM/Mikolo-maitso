// ScanScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const { height, width } = Dimensions.get('window');

export default function ScanScreen() {
  const cameraRef = useRef(null);
  const viewRef = useRef(null);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    animateScanLine();
  }, []);

  const animateScanLine = () => {
    scanAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: height * 0.6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const takeScreenshot = async () => {
    setIsScanning(false); // pour figer la caméra
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
    });
    await MediaLibrary.saveToLibraryAsync(uri);
    alert('Capture sauvegardée !');
    setIsScanning(true);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Accès caméra refusé</Text>;
  }

  return (
    <View style={styles.container} ref={viewRef}>
      <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.back}>
        {isScanning && (
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanAnim }] },
              ]}
            />
          </View>
        )}
      </Camera>

      <TouchableOpacity style={styles.button} onPress={takeScreenshot}>
        <Text style={styles.text}>📷 Capturer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '80%',
    height: '60%',
    borderColor: 'green',
    borderWidth: 2,
    overflow: 'hidden',
  },
  scanLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'lime',
    position: 'absolute',
    top: 0,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
