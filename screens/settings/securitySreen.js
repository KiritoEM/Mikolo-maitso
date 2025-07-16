import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import mockUser from '../../data/userMock';

import Button from '../../components/shared/ui/button/button';

const user = mockUser[0];

export default function SecuritySettingsScreen() {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [faceID, setFaceID] = useState(true);

  const [isOldPassword, setIsOldPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.title1}>Sécurités</Text>

      </TouchableOpacity>


      <Text style={styles.title}>Mot de passe</Text>
      <Text style={styles.subtitle}>Modifiez votre mot de passe pour une protection optimale.</Text>

      <Text style={styles.label}>Ancien mot de passe</Text>
      <View     style={[
          styles.inputWrapper,
          isOldPassword && styles.focusedInput,
        ]}
 >
        <TextInput
          secureTextEntry={!showOld}
          style={styles.input}
          value={oldPassword}
           placeholder="Votre ancien mot de passe"
          onChangeText={setOldPassword}
          onFocus={() => setIsOldPassword(true)}
          onBlur={() => setIsOldPassword(false)}
        />
        <TouchableOpacity onPress={() => setShowOld(!showOld)}>
          <Ionicons name={showOld ? 'eye-outline' : 'eye-off-outline'} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nouveau mot de passe</Text>
      <View style={[
          styles.inputWrapper,
          isNewPassword && styles.focusedInput,
        ]}>
        <TextInput
          secureTextEntry={!showNew}
          style={styles.input}
          placeholder="Votre nouveau mot de passe"
          value={newPassword}
          onChangeText={setNewPassword}
          onFocus={() => setIsNewPassword(true)}
          onBlur={() => setIsNewPassword(false)}
        />
        <TouchableOpacity onPress={() => setShowNew(!showNew)}>
          <Ionicons name={showNew ? 'eye-outline' : 'eye-off-outline'} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <Button title="Mettre à jour"/>

      <View style={styles.section}>
        <Text style={styles.title}>Reconnaissance faciale</Text>
        <Text style={styles.subtitle}>Activez ou désactivez la reconnaissance faciale pour déverrouiller votre compte.</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Statut</Text>
          <Switch value={faceID} onValueChange={setFaceID} trackColor={{ true: '#2a95fe' }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6fa',
    padding: 20 },
  backIcon: { 
    display:'flex',
    position: 'absolute',
     top: 40, 
     left: 20 },
  title1:{
    fontSize: 18,
    fontWeight: '600',
    marginTop: -20,
    marginLeft:36,
    fontFamily:'DMSansBold',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily:'DMSans',
    marginTop: 68,
    marginBottom: 5,
    color:'#393d37',
   },
  subtitle: {
     marginBottom: 20,
     fontFamily:'DMSansRegular',
     fontSize: 17,
     color:'#6e6e6e',

    },
  label: { 
    fontSize:16,
    fontWeight: '500', 
    fontFamily:'DMSans',
    marginBottom: 6, 
    color:'#393d37',

  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height:50,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  focusedInput: {
    borderColor: '#86ba2b', //bordure 
  },
  input: {
     flex: 1,
     height: 40, },
  
  buttonText: { color: 'white', fontWeight: 'bold' },
  section: { marginTop: 20 },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
});
