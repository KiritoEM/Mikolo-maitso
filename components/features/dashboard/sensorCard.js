import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const icons ={
    humidity: <Ionicons name ="water-outline" size={48} color ="#00c853"/>,
    light: <Feather name="sun" size={48} color="#ffd600"/>,
    temperature : <Ionicons name="thermometer-outline" size={48} color="#ff3d00"/>

};

const SensorCard=({label,value,icon}) => (
   
   
    <View style={[styles.card, styles[icon]]}>
        <Text style={styles.label}>
            {/* ici les label */}
            {label} 
        </Text>
        <View style={styles.row}>
            <Text style={styles.value}>
                {value}
            </Text>
            {/* icones correspondant */}
            {icons[icon]}
        </View>
    </View>
  
)
export default SensorCard;

const styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 30,
      marginTop: 13,
      marginBottom: 13,
      marginRight:16,
      marginLeft:16,
      height:94,
      width:334,
    },
    humidity: { backgroundColor: '#E0F2F1' },
    light: { backgroundColor: '#FFF9C4' },
    temperature: { backgroundColor: '#FFEBEE' },
    label: { fontSize: 16, color: '#666', fontFamily:'DMSans',fontWeight: '500'},
    value: { fontSize: 28, fontWeight: '900', flex: 1,  fontFamily:'DMSans'},
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  });
  