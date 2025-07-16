import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const PlantCard = ({ plant, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(plant)}>

      <View style={styles.textContainer}>
        <Text style={styles.plantName}>{plant.current_name}</Text>
        <Text style={styles.scientificName}>{plant.scientific_name}</Text>

        <View style={[styles.statusBadge, { backgroundColor: plant.status === 'Bonne santé' ? '#D6F2C2' : '#F2D2C2' }]}>
          
          <Text style={[styles.statusText, { color: plant.status === 'Bonne santé' ? '#6CC51E' : '#E07B7B' }]}>
            {plant.status}
          </Text>
        </View>
      </View>

      {/* image de la plante */}
      <Image source={plant.image} style={styles.plantImage} />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    marginRight:12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    width:330,
    height:129,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  plantName: {
    fontSize: 18,
    fontFamily:'DMSans',
    fontWeight: '700',
    color: '#393d37',
    marginBottom: 5,
  },
  scientificName: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    fontFamily:'DMSans',

  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    width:98,
    height:27,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily:'DMSansRegular',
    color:'#60bd18',
    alignSelf: 'center',
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default PlantCard;