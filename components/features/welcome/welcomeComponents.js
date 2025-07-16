import React from "react";
import { View,StyleSheet,Text} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonStart from "../../shared/ui/button/buttonStart";
import LogoSvg from "../../../helpers/logosvg";
import Woman from "../../../helpers/woman";

    const WelcomeComponents = () => {
        const navigation = useNavigation();

  const handleStart = () => {
    navigation.replace("Tabs");};
        return (
            <View style={styles.container}>
                <LogoSvg style={styles.logo} />
                <Woman style={styles.image} />
                <Text style={styles.title}>Des plantes épanouies, intelligemment</Text>
                <Text style={styles.subtitle}>Un système intelligent qui optimise l'irrigation des plantes.</Text>
                <ButtonStart  title="Commencer"  onPress={handleStart}/>
            </View>
        );
    };
    

export default WelcomeComponents;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 110.65,
        height: 49,
        marginBottom:-40,
        marginTop:-44,
    },
    image: {
        width: 419.85,
        height: 376.5,
        marginTop:75,
        // marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontFamily:'DMSans',
        fontSize: 30,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight:'500',
        fontFamily:'DMSans',
        textAlign: 'center',
        marginTop: 30,
        marginHorizontal: 20,
    },
      
  
})