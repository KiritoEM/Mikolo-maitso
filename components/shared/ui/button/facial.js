import React from "react";
import { TouchableOpacity,Text,StyleSheet} from "react-native";
// import { MaterialIcons,Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FacialRecognitionButton =({ onPress })=>{
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <MaterialCommunityIcons name="face-recognition" size={20} color="#393d37"/>
            <Text style={styles.text}>
                Par reconnaissance facial
            </Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        flexDirection:"row",
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius:13,
        padding:12,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        width:333,
        height:54,
    },
    text:{
        marginLeft:8,
        fontWeight:"500",
        fontFamily:'DMSans',
        color:'#393d37',
        fontSize:16,

    },

})

export default FacialRecognitionButton;