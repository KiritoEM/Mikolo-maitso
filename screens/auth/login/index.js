import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

import LoginComponent from "../../../components/features/login/loginComponents";

const LoginScreen=() =>{
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <LoginComponent/>
            </ScrollView>
        </SafeAreaView>
    )

}
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#fff",
    },
  });
