import React, { useContext } from "react";
import {View,Text,StyleSheet,TouchableOpacity} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import useUploadImage from "../../../hooks/useUploadImage";
import AuthContext from "../../../context/authContext";
import LogoSvg from "../../../helpers/logosvg";
import Avatar from "../../../helpers/avatarsvg";

const FinalisationComponents = () => {
  const { image, pickImage } = useUploadImage();
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const confirm = () => {
    if (user) {
      setUser({ ...user, profile_picture: image });
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.backButton} >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <LogoSvg style={styles.logo} />
      <Text style={styles.title}>Finalisez votre inscription</Text>
      <Text style={styles.subtitle}>
        Ajouter une photo de profil pour activer la reconnaissance faciale
      </Text>

      <View style={styles.imageContainer}>
{/* remplace Avatar */}
      <Avatar imageUri={image || user?.profile_picture} style={styles.avatar} /> 
      
      <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.confirm} onPress={confirm}>
          <Text style={styles.confirmText}>Confirmer</Text>
        </TouchableOpacity>
        <TouchableOpacity
           style={styles.skip}
            onPress={() => {
            if (user) {
            setUser({ ...user, profile_picture: "default.png" }); 
              }
            }}
          >
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
  backButton: {
    position: "absolute",
    top: 1,
    left: 20,
  },
  logo: {
    width: 130,
    height: 58,
    // marginBottom: 10,
    marginTop: -150,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily:'DMSans',
    textAlign: "center",
    marginBottom: 19,
    marginTop:1,

  },
  subtitle: {
    textAlign: "center",
    fontWeight: '500',
    fontFamily:'DMSans',
    marginBottom: 30,
    color: "#666",
    fontSize: 17,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 40,
  },
  avatar: {
    width: 135.52,
    height: 135,
    borderRadius: 60,
  },
  iconContainer: {
    position: "absolute",
    height:40,
    width:40,
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
    backgroundColor: "#7cb518",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
    width: 160,
  },
  confirmText: {
    color: "white",
    fontFamily:'DMSans',
    fontWeight: '600',
    fontSize: 21,
  },
  skip: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#666",
    height: 50,
    width: 160,
  },
  skipText: {
    color: "black",
    fontFamily:'DMSans',
    fontWeight: '600',
    fontSize: 21,
  },
});

export default FinalisationComponents;
