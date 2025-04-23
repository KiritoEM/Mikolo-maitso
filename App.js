import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './pages/login';
import InscriptionScreen from './pages/signup/index';
// import SimulationGraphs from './pages/chart/chart';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <InscriptionScreen/>
      {/* <SimulationGraphs/> */}
      {/* <LoginScreen/> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
