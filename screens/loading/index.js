import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView,ActivityIndicator,StyleSheet,Image } from "react-native";

export default function LoadingScreen (){
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>

        <View>
            <Image source={require('../../assets/images/ispm.png')}  style={styles.logo}/>
            <ActivityIndicator
                size={"large"}
                color='green'
            />
            
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
      },
      logo:{
        width:90,
        height:100,
      }
    
})