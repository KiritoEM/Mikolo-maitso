import React from "react";
import { TouchableOpacity,Text,StyleSheet} from "react-native";
// import { MaterialIcons,Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FacialRecognitionButton =()=>{
    return(
        <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="face-recognition" size={20} color="#333"/>
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
        borderRadius:10,
        padding:12,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
    },
    text:{
        marginLeft:8,
        color:"#333",
        fontWeight:"500",
    },

})

export default FacialRecognitionButton;