import React from 'react';
import {ScrollView, SafeAreaView } from 'react-native';
import Header from '../../../components/features/dashboard/header';
import ScanCard from '../../../components/features/dashboard/scanCard';
import SensorCard from '../../../components/features/dashboard/sensorCard';
import PlantChart from '../../../components/features/dashboard/chart';

import { GetSensorDetails } from '../../../data/getSensorDetails';
import mockUser from '../../../data/userMock';

  const humidity=GetSensorDetails('humidity');
  const light=GetSensorDetails('light');
  const temperature=GetSensorDetails('temperature');

const HomeScreen = () => {
  
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <Header user={mockUser[0]} />

        <ScanCard />
        
        <SensorCard label="Taux d’humidité"  value= {humidity.value + ' ' +humidity.unit} icon="humidity" /> 
        <SensorCard label="Intensité lumineuse" value={light.value + ' ' +light.unit}icon="light" />
        <SensorCard label="Température actuelle" value={temperature.value + ' ' +temperature.unit}icon="temperature" />
        <PlantChart/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
