import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PlantChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [45, 25, 15, 18, 28, 48, 22],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`, 
    labelColor: (opacity = 1) => `#848a9c`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    barPercentage: 0.5, // Largeur des barres
    fillShadowGradient: '#00BCD4',
    fillShadowGradientOpacity: 1,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>nombre de plantes</Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={162}
        chartConfig={chartConfig}
        style={styles.chart}
        showValuesOnTopOfBars={false}
        fromZero={true}
        showBarTops={false}
       
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 17,
    marginLeft:15,
    marginRight:20,
    width:334,

    borderRadius: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
    fontFamily:'DMSans',
    color: '#333',
    marginLeft: 20,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
    marginLeft:14,
    marginHorizontal: 20,
  },
});

export default PlantChart;