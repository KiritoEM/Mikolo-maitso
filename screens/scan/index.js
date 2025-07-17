import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { imageAnalysisService } from '../../services/imageAnalysisService';
const ScanScreen = () => {
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const openCamera = async () => {
    if (cameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        try {
          const manipulatedImage = await ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
          );
          setImage(manipulatedImage.uri);
        } catch (error) {
          Alert.alert("Erreur", "Échec de la conversion de l'image.");
        }
      }
    } else {
      Alert.alert("Permission refusée", "Active la caméra dans les paramètres.");
    }
  };

  const handlePrediction = async () => {
    if (!image) return;

    try {
      const result = await imageAnalysisService.analyzePlantImage(image);
      Alert.alert("Résultat", JSON.stringify(result, null, 2));
    } catch (error) {
      Alert.alert("Erreur", error.message || "Erreur inconnue");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identifier une plante</Text>
      <Text style={styles.subtitle}>Prenez une photo de la plante</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text>Pas d'image sélectionnée</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Scanner</Text>
      </TouchableOpacity>

      {image && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#7cb518', marginTop: 10 }]}
          onPress={handlePrediction}
        >
          <Text style={styles.buttonText}>Prédire</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  placeholder: {
    width: '100%', height: 200, backgroundColor: '#f0f0f0',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  preview: { width: '100%', height: 200, marginBottom: 20, resizeMode: 'cover' },
  button: {
    backgroundColor: '#7cb518', padding: 15, borderRadius: 10,
    width: '100%', alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default ScanScreen;
