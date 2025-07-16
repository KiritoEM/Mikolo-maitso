import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";


import Button from "../../shared/ui/button/button";
import LogoSvg from "../../../helpers/logosvg";
import mockUser from "../../../data/userMock";

const InscriptionComponent = () => {
  const navigation = useNavigation();

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validation = () => {
    const existingUser = mockUser.find(u => u.email === email);

    if (existingUser) {
      console.log("Un compte existe déjà avec cet email.");
    } else {
      const newUser = {
        id: mockUser.length + 1,
        email,
        password: password,
        profile_picture: null, 
        created_at: new Date(),
        role: 'user',
      };
      mockUser.push(newUser);
      navigation.navigate("Login");
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
          placeholder="Pseudo"
          value={pseudo}
          onChangeText={setPseudo}
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
          onChangeText={setpassword}
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

export default InscriptionComponent;
