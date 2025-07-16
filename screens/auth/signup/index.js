import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

import InscriptionComponent from "../../../components/features/signup/signupComponents";

const InscriptionScreen=() =>{
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <InscriptionComponent/>
            </ScrollView>
        </SafeAreaView>
    )

}
export default InscriptionScreen;
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#fff",
    },
  });
