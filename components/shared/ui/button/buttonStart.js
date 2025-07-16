import React from "react";
import {View, TouchableOpacity,Text,StyleSheet } from "react-native";

const ButtonStart =({onPress, title}) => {
    return (
        <View>
            <TouchableOpacity style = {styles.button} onPress={onPress}>
                <Text style={styles.textButton}>
                {title}
                </Text>
            </TouchableOpacity>
        </View>
   

    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor:"#7cb518",
        height:56,
        width:327,
        paddingVertical: 12,
        paddingHorizontal : 20,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 18,
        marginBottom: 18,
        gap:38,

    },
    textButton:{
        color:"#f5f5f5",
        fontWeight:'600',
        fontFamily:'DMSans',
        fontSize:20,
        fontWeight: "bold",
    },
});
export default ButtonStart;
