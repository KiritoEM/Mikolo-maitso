import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import PlantCard from '../../components/features/listPlant/plantCard';
import Header from '../../components/features/listPlant/headerPlantlist';
import mockPlant from '../../data/plantMock';



const PlantListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <PlantCard
      plant={item}
      onPress={(plant) => navigation.navigate('PlantDetail', { plant })}
    />
  );

  return (
    <View style={styles.container}>
     <Header/>
     <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    placeholder="Rechercher"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                />
        </View>
        <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="options-outline" size={22} color="#000" />
        </TouchableOpacity>
</View>


      <FlatList
        data={mockPlant}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.plantList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop:50,
  },
  
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    marginRight: 12,
    marginLeft:10,
    
  },
  
  searchIcon: {
    marginRight: 8,
  },
  
  searchInput: {
    fontSize: 15,   
    flex: 1,
    color: '#333',
   fontFamily:'DMSansRegular',
   fontWeight:'400',
  },
  
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight:5,
   
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  
  plantList: {
    paddingBottom: 20,
  },
});

export default PlantListScreen;