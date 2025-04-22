import React from "react";
import {View, TouchableOpacity,Text,StyleSheet } from "react-native";

const Button =({onPress, title}) => {
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
        backgroundColor:"#86ba2b",
        height:40,
        paddingVertical: 12,
        paddingHorizontal : 20,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    textButton:{
        color:"#fff",
        fontSize:16,
        fontWeight: "bold",
    },
});
export default Button;
