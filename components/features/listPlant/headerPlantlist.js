import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import LogoSvg from "../../../helpers/logosvg";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.container}>
      <LogoSvg style={styles.logo} />
      <TouchableOpacity style={styles.notificationContainer}>
        <Ionicons name="notifications-outline" size={26} color="#333" />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: -10,
    marginBottom: -1,
    justifyContent: "space-between",
    alignItems: "center",
  },
 
  notificationContainer: {
    position: "relative",
    marginLeft: 90,
    marginTop: 50,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  logo: {
    width: 106,
    height: 57,
    marginBottom: -50,
    marginTop:5,
},
});

export default Header;
 