import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import useUploadImage from "../../../hooks/useUploadImage";
import AuthContext from "../../../context/authContext";
import LogoSvg from "../../../helpers/logosvg";
import Avatar from "../../../helpers/avatarsvg";

const FinalisationComponents = () => {
  const { image, pickImage } = useUploadImage();
  const { setUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  
  // Récupérer les données passées depuis l'inscription
  const { userData, token } = route.params || {};

  // Vérifier si les données nécessaires sont présentes
  useEffect(() => {
    if (!userData || !token) {
      Alert.alert(
        "Erreur", 
        "Données utilisateur manquantes. Veuillez recommencer l'inscription.",
        [{ text: "OK", onPress: () => navigation.navigate("Signup") }]
      );
    }
  }, [userData, token]);

  const confirm = async () => {
    try {
      // Mettre à jour l'utilisateur dans le contexte
      setUser({ 
        ...userData,
        token,
        profile_picture: image || "default.png"
      });
      
      // Naviguer vers l'écran d'accueil
      navigation.navigate("Welcome");
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la finalisation du profil."
      );
      console.error("Finalisation error:", error);
    }
  };

  const skip = () => {
    setUser({
      ...userData,
      token,
      profile_picture: "default.png"
    });
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <LogoSvg style={styles.logo} />
      <Text style={styles.title}>Finalisez votre inscription</Text>
      <Text style={styles.subtitle}>
        Ajouter une photo de profil pour activer la reconnaissance faciale
      </Text>

      <View style={styles.imageContainer}>
        <Avatar 
          imageUri={image || userData?.profile_picture} 
          style={styles.avatar} 
        />
        <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.confirm} onPress={confirm}>
          <Text style={styles.confirmText}>Confirmer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skip} onPress={skip}>
          <Text style={styles.skipText}>Ignorer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 130,
    height: 58,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'DMSans',
    textAlign: "center",
    marginBottom: 19,
    color: '#393d37',
  },
  subtitle: {
    textAlign: "center",
    fontWeight: '500',
    fontFamily: 'DMSans',
    marginBottom: 30,
    color: "#666",
    fontSize: 17,
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 40,
  },
  avatar: {
    width: 135,
    height: 135,
    borderRadius: 67.5,
    borderWidth: 2,
    borderColor: "#7cb518",
  },
  iconContainer: {
    position: "absolute",
    height: 40,
    width: 40,
    bottom: 0,
    right: 0,
    backgroundColor: "#7cb518",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  confirm: {
    backgroundColor: "#7cb518",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    width: 160,
    elevation: 3,
  },
  confirmText: {
    color: "white",
    fontFamily: 'DMSans',
    fontWeight: '600',
    fontSize: 18,
  },
  skip: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#666",
    height: 50,
    width: 160,
    elevation: 3,
  },
  skipText: {
    color: "#393d37",
    fontFamily: 'DMSans',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default FinalisationComponents;