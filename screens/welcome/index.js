import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeComponents from "../../components/features/welcome/welcomeComponents";
import { ScrollView, StyleSheet } from "react-native";

const WelcomeScreen =()=>
{ return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>
            <WelcomeComponents/>
        </ScrollView>
    </SafeAreaView>

)
    
}
export default WelcomeScreen;
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#fff",
    },
  });