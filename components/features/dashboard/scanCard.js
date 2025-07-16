import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ScanCard = () => {
  const navigation = useNavigation();
  return(
  <View>
       <LinearGradient
          colors={['#6cc9cc', '#9aebeb']}
          style={styles.card}
        >
        <View style={styles.inner}>
          <View style={styles.headCard}>
            <Text style={styles.headCardText}>Scan</Text>
            <Text style={styles.title}>Scannez et identifiez votre plante</Text>
            <TouchableOpacity style={styles.fleche} 
                onPress={() => navigation.navigate('Scan')}
            >
              <Ionicons
                name='arrow-forward' size={20} color="#00796b"
              />
            </TouchableOpacity>
          </View>
          
          <Image source={require('../../../assets/images/plant.png')} style={styles.image} />
         
        </View>
    </LinearGradient>
    <Text style={styles.capterText}> Capteurs</Text>
  </View>
 
);
};
const styles = StyleSheet.create({
  headCardText:{
    color: '#fff',
    fontFamily:'DMSans',
    fontSize:12,
  },
  headCard:{
    width:180,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    marginTop:10,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily:'DMSans',
    color: '#fff',
    flex: 1,
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 12,
   
  },
  capterText:{
    fontSize:21,
    marginTop:30,
    marginBottom:30,
    fontFamily:'DMSans',
    fontWeight:'500',
  },
  fleche:{
    alignSelf:'flex-start',
    backgroundColor:'#fff',
    borderRadius:10,
    padding:5,
    marginTop:5,
  }
});

export default ScanCard;
