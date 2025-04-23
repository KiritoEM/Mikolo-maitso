import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useUploadImage from "../../../hooks/useUploadImage";
import LogoSvg from "../../../helpers/logosvg";
import Avatar from "../../../helpers/avatarsvg";

const FinalisationComponents = () => {
  const { image, pickImage } = useUploadImage();

  return (
    <View style={styles.container}>
      <LogoSvg style={styles.logo} />
      <Text style={styles.title}>Finalisez votre inscription</Text>
      <Text style={styles.subtitle}>
        Ajouter une photo de profil pour activer la reconnaissance faciale
      </Text>

      <View style={styles.imageContainer}>
        <Avatar style={styles.avatar} />
        <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.confirm}>
          <Text style={styles.confirmText}>Confirmer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skip}>
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
  },
  logo: {
    width: 100,
    height: 100,
    marginTop:-50,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop:-30,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    fontSize: 18,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#86ba2b",
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
  confirm: {
    backgroundColor: "#86ba2b",
    alignItems:"center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    height:50,
    width:150,  },


  confirmText: {
    color: "white",
    fontWeight: "bold",
    fontSize:21,
  },


  skip: {
    backgroundColor: "white",
   alignItems:"center",
   paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#666",
    height:50,
    width:150,
  },
  skipText: {
    color: "black",
    fontWeight: "bold",
    fontSize:20,
  },
});

export default FinalisationComponents;
