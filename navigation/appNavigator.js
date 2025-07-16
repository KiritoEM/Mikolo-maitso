import React, { useContext, useEffect, useState } from "react";
import { View,StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Auth context
import AuthContext from "../context/authContext";

// Écrans d’auth
import LoginScreen from "../screens/auth/login";
import InscriptionScreen from "../screens/auth/signup";
import FinalizeProfilScreen from "../screens/auth/finalisation";
import WelcomeScreen from "../screens/welcome";
import LoadingScreen from "../screens/loading";

// Dashboard
import HomeScreen from "../screens/dashboard/home";

// plantes
import PlantListScreen from "../screens/listPlant";
import PlantDetailScreen from "../screens/detailPlant";

//irrigation
import IrrigationScreen from "../screens/irrigation";

//Scan
import ScanScreen from "../screens/scan";

// Paramètres
import SettingsScreen from "../screens/settings";
import ProfileSettingsScreen from "../screens/settings/profilSetting";
import SecuritySettingsScreen from "../screens/settings/securitySreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlantList" component={PlantListScreen} />
      <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Scan") {
            return (
              <View
                style={{
                  backgroundColor: "#7cb518",
                  width: 60,
                  height: 60,
                  borderRadius: 80,
                  padding: 2,
                  position: "absolute",
                  top: -35,
                  gap:4,
                  borderWidth:4,
                  borderColor:'#ffff',
                }}
              >
                <Ionicons name="scan" size={24} color="white" style={styles.scan} />
              </View>
            );
          }

          let iconName;
          switch (route.name) {
            case "Accueil":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Plantes":
              iconName = focused ? "leaf" : "leaf-outline";
              break;
            case "Irrigations":
              iconName = focused ? "water" : "water-outline";
              break;
            case "Paramètres":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7cb518",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Plantes" component={HomeStack} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{ tabBarLabel: () => null }} />
      <Tab.Screen name="Irrigations" component={IrrigationScreen} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const { user, loading } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Simuler la vérification de session
    setTimeout(() => setChecking(false), 2500); //2.5s
  }, []);

  if (checking || loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        key={user?.profile_picture ? "with-profile" : "no-profile"} 
      >
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={InscriptionScreen} />
          </>
        ) : !user.profile_picture ? (
          <Stack.Screen name="FinalizeProfile" component={FinalizeProfilScreen} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  scan: {
    marginTop:9.5,
    marginLeft:12,
     },
  })