import React from 'react';
import { SafeAreaView } from 'react-native';
import IrrigationsItem from '../../components/features/irrigation/irrigationItem';

const IrrigationScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <IrrigationsItem />
    </SafeAreaView>
  );
};

export default IrrigationScreen;
