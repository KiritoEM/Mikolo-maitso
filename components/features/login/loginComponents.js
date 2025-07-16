import React, { useState } from "react";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import AuthContext from "../../../context/authContext";
import * as LocalAuthentication from 'expo-local-authentication';

import Button from "../../shared/ui/button/button";
import FacialRecognitionButton from "../../shared/ui/button/facial";
import LogoSvg from "../../../helpers/logosvg";

// import { login } from "../../../services/auth";

const LoginComponent = () => {

  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try{
      const data = await login(email, password);

      console.log('Token recu', data.token);
      
      navigation.navigate('Tabs', { screen: 'Accueil' });
      
    } catch(error){
      Alert.alert('Erreur', error.message);
    }
  };

  // facial
  const handleFaceAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();//Vérifie le matériel
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  
    if (!hasHardware || !isEnrolled) {
      Alert.alert("Erreur", "Reconnaissance faciale non disponible sur cet appareil.");
      return;
    }
  
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Connexion par reconnaissance faciale",
      fallbackLabel: "Utiliser le mot de passe",
      disableDeviceFallback: false,
    });
  
    if (result.success) {
      try {
        const data = await login("user@example.com", "example123"); //Connexion simulée avec données mock
        
        console.log('Token recu via reconnaissance faciale', data.token);
        
        navigation.navigate('Tabs', { screen: 'Accueil' });
        
      } catch(error) {
        Alert.alert('Erreur', error.message);
      }
    } else {
      Alert.alert("Échec", "Échec de la reconnaissance faciale.");
    }
  };

  return (
    <View style={styles.container}>
      <LogoSvg style={styles.logo} />
      <Text style={styles.title}>Se connecter</Text>

      <View style={styles.input}>
        <MaterialIcons name="email" size={20} color="#393d37" style={{ marginRight: 10 }} />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.input}>
        <Ionicons name="lock-closed" size={20} color="#393d37" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Button title="Se connecter" onPress={handleLogin} />

      <View style={styles.separation}>
        <View style={styles.line}></View>
        <Text style={styles.separatorText}>OU</Text>
        <View style={styles.line}></View>
      </View>

      <FacialRecognitionButton onPress={handleFaceAuth} />

      <Text style={styles.textLink} >Pas encore de compte?
        <Text style={styles.link} onPress={() => navigation.navigate("Signup")}> Créer un compte </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
  },
  logo: {
    width: 130,
    height: 58,
    marginLeft:85,
  },
  title: {
    fontSize: 28,
    fontFamily:'DMSansBold',
    fontWeight: '700',
    textAlign: "center",
    marginBottom: 50,
    marginTop:15,
    color:'#393d37',
  },
  input: {
    height: 50,
    width: 333,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#f8f8f8",
  },
  separation: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize:14,
    fontWeight: "600",
    color:'#0e0e0e',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  textLink: {
    textAlign: "center",
    marginTop: 50,
    fontSize:14,
    fontFamily:'DMSans',
    fontWeight: '500',
  },
  link: {
    color: "#2a95fe",
    fontWeight: '700',
    fontFamily:'DMSansBold',
    fontSize:14,
  },
});

export default LoginComponent;