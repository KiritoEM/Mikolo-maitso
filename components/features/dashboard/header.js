import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bienvenue, {user?.name || "Utilisateur"} <Text style={{ fontSize: 18 }}>👋</Text>
      </Text>
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
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 21,
    fontFamily:'DMSans',
    fontWeight: "600",
    color: "#333",
  },
  notificationContainer: {
    position: "relative",
    marginLeft: 90,
    marginTop: 10,
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
});

export default Header;
