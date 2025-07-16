import React from 'react';
import {View,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../listPlant/headerPlantlist';
import irrigationData from '../../../data/mockIrigation';


const IrrigationsItem = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Irrigations</Text>
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="options-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.irrigationList}>

        {Array.isArray(irrigationData) && irrigationData.length > 0 ? (
          irrigationData.map((item) => (
            
            <View key={item.id} style={styles.irrigationCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.plantName}>{item.plant_name}</Text>

                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{item.last_action}</Text> 
                </View>
              </View>


              <View style={styles.cardFooter}>
                <Text style={styles.microcontrollerId}>
                  {item.id_microcontroller}
                </Text>

                <View style={styles.modeContainer}>
                  <View
                    style={[
                      styles.modeIndicator,
                      item.mode === 'MANUEL'
                        ? styles.manualMode
                        : styles.automaticMode,
                    ]}
                  />
                  <Text style={styles.modeText}>{item.mode}</Text>
                </View>

              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 30 }}>
            Aucune donnée d'irrigation
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily:'DMSansBold',
    fontWeight: '700',
    color: '#393d37',
  },
  filterIcon: {
    padding: 5,
  
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
},
  irrigationList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  irrigationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent:'space-between',
    height:91,
    width:335,
    marginLeft:-5,
    
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  plantName: {
    fontSize: 16,
    fontFamily:'DMSans',
    fontWeight: '00',
    color: '#393d37',
  },
  dateBadge: {
    backgroundColor: '#f3f9fa',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 14,
    fontWeight:'500',
    fontFamily:'DMSans',
    color: '#393d37',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  microcontrollerId: {
    fontSize: 14,
    fontFamily:'DMSansRegular',
    fontWeight:'400',
    color: '#6e6e6e',
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  manualMode: {
    backgroundColor: '#60bd18',
  },
  automaticMode: {
    backgroundColor: '#4b76dd',
  },
  modeText: {
    fontSize: 13,
    fontFamily:'DMSansRegular',
    fontWeight: '400',
    color: '#6e6e6e',
  },
});

export default IrrigationsItem;
