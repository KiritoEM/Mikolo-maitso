import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Button from "../../shared/ui/button/button";
import LogoSvg from "../../../helpers/logosvg";
import { signin } from "../../../services/inscription";

const InscriptionComponent = () => {
  const navigation = useNavigation();

  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validation = async () => {
    if (!username || !email || !password) {
      Alert.alert("Champs manquants", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await signin(username, email, password);
      console.log("Réponse du serveur:", response.data);

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Succès", response.data.message || "Compte créé avec succès !");
        navigation.navigate("Login");
      }
    } catch (error) {
      if (error.response) {
        // Erreur retournée par le serveur (ex: statut 400 ou 500)
        console.error("Erreur serveur:", error.response.data);
        Alert.alert("Erreur serveur", error.response.data.message || "Une erreur s’est produite sur le serveur.");
      } else if (error.request) {
        // Aucune réponse reçue (ex: problème de connexion réseau)
        console.error("Erreur réseau ou aucune réponse du serveur:", error.request);
        Alert.alert("Erreur réseau", "Impossible de joindre le serveur. Vérifie ta connexion.");
      } else {
        // Autres erreurs
        console.error("Autre erreur:", error.message);
        Alert.alert("Erreur", error.message || "Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <LogoSvg style={styles.logo} />
      <Text style={styles.title}>Créer un compte</Text>

      <View style={styles.input}>
        <MaterialIcons name="person" size={22} color="#393d37" style={styles.icon} />
        <TextInput
          style={{ flex: 1 }}
          placeholder="username"
          value={username}
          onChangeText={setusername}
        />
      </View>

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

      <Button title="Créer un compte" onPress={validation} />

      <Text style={styles.textLink}>
        Vous avez déjà un compte ?
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}> Se connecter</Text>
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
    marginLeft: 85,
  },
  title: {
    fontSize: 28,
    fontFamily: 'DMSansBold',
    fontWeight: '700',
    textAlign: "center",
    marginBottom: 50,
    marginTop: 15,
    color: '#393d37',
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
  textLink: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 14,
    fontFamily: 'DMSans',
    fontWeight: '500',
  },
  link: {
    color: "#2a95fe",
    fontWeight: '700',
    fontFamily: 'DMSansBold',
    fontSize: 14,
  },
});

export default InscriptionComponent;