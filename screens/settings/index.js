import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import mockUser from '../../data/userMock';

const user = mockUser[0];

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Paramètres</Text>
        <Ionicons name="log-out-outline" size={25} color="darkred" />
      </View>

      <View style={styles.profileContainer}>
        <Image source={user.profile_picture} style={styles.avatar} />
        <View>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProfileSettings')}
      >
        <Text style={styles.cardText}>Profile</Text>
        <Ionicons name="chevron-forward" size={20} color="#393d37" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('SecuritySettings')}
      >
        <Text style={styles.cardText}>Sécurités</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f6fa', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
    marginTop:15,
   },
  title: { 
    fontSize: 23,
    fontFamily:'DMSansBold',
    fontWeight: '700',
   },
  profileContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15
  },
  email: { 
    color: '#6e6e6e',
    fontSize:14,
    fontFamily:'DMSansRegular',
    fontWeight:'400',
   },
  name: {
    fontSize: 18, 
    marginTop:2,
    fontFamily:'DMSans',
    fontWeight:'600',
    color:'#393d37',
   },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth:1,
    borderColor:'#c4c4c4',
    width:335,
    height:54,
  },
  cardText: {
     fontSize: 18,
     fontFamily:'DMSans',
     fontWeight:'500',
     },
});
