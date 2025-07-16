import React, { useState } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import mockUser from '../../data/userMock';
import Button from '../../components/shared/ui/button/button';

const user = mockUser[0];

export default function ProfileSettingsScreen() {
  const navigation = useNavigation();
  const [pseudo, setPseudo] = useState(user.name);
  const [image, setImage] = useState(user.profile_picture);

  const [isPseudoFocused, setIsPseudoFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.title}>Paramètres profile</Text>
      </TouchableOpacity>

      

      <View style={styles.avatarContainer}>
        <Image source={image} style={styles.avatar} />
        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
          <Ionicons name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Pseudo</Text>
      <View
        style={[
          styles.inputWrapper,
          isPseudoFocused && styles.focusedInput,
        ]}
      >
        <Ionicons name="person" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={pseudo}
          onChangeText={setPseudo}
          onFocus={() => setIsPseudoFocused(true)}
          onBlur={() => setIsPseudoFocused(false)}
        />
      </View>

      <Text style={styles.label}>Adresse email</Text>
      <View
        style={[
          styles.inputWrapper,
          isEmailFocused && styles.focusedInput,
        ]}
      >
        <Ionicons name="mail" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={user.email}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      <Button title="Mettre à jour" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6fa',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily:'DMSansBold',
    marginTop: -20,
    marginLeft:38,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 21,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 150,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '30%',
    backgroundColor: '#86ba2b',
    borderRadius: 5,
    padding: 5,
  },
  label: {
    marginTop: 16,
    fontFamily:'DMSans',
    fontSize:16,
    fontWeight: '500',
    color:'#393d37',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    borderWidth: 2,
    height:50,
    borderColor: 'transparent',
  },
  focusedInput: {
    borderColor: '#86ba2b', //bordure 
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#7cb518',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
   
  },
  buttonText: {
    color: '#f5f5f5',
    fontWeight: '600',
    fontFamily:'DMSansBold',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
