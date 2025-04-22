import React,{useState} from "react";
import { View,StyleSheet,Text,TextInput,TouchableOpacity} from "react-native";
import { MaterialIcons,Ionicons } from "@expo/vector-icons";
import Button from "../../shared/ui/button/button";
import FacialRecognitionButton from "../../shared/ui/button/facial";
import LogoSvg from "../../../helpers/logosvg";


const LoginComponent =()=>{

    const [ email, setEmail] = useState('');
    const [ motDePasse, setMotDePasse ] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const validation =()=>
        {
            console.log("Connectée");
        }

    return(
        <View style={styles.container}>
            <LogoSvg style={styles.logo}/>
            <Text style={styles.title}>Se connecter</Text>


            <View style={styles.input}>
            <MaterialIcons name="email" size={20} color="#999" style={{marginRight: 10}} />

                <TextInput
                    style={{flex: 1}}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.input}>
                <Ionicons name="lock-closed" size={20} color="#999" style={{marginRight: 10}} />
                    <TextInput
                        placeholder="Mot de passe"
                        secureTextEntry={!showPassword}
                        value={motDePasse}
                        onChangeText={setMotDePasse}
                        style={{flex: 1}}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
                    </TouchableOpacity>
            </View>

            <Button  title="Se connecter" onPress={validation}/>
            {/* ici le code pour le grand trait */}
            <View style={styles.separation}>
                <View style={styles.line}></View>
                <Text style={styles.separatorText}>OU</Text>
                <View style={styles.line}></View>

            </View>
            <FacialRecognitionButton onPress={()=>console.log('bouton pressé')} />

            <Text style={styles.textLink}> Pas encore de compte?<Text style={styles.link}> Créer un compte </Text> </Text>

        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        margin:20,
      
    },
    logo:{
        width:200,
        height:200,
        alignItems:"center",
       
    },
    title:{
        fontSize:35,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:50,

    },
     
    input:{
        height:45,
        width:300,
        borderColor:"transparent",
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:10,
        marginBottom:35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#f9f9f9",
    },

    separation:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20,
    },
    separatorText:{
        marginHorizontal:10,
        color:"#777",
        fontWeight:"500",
    },
    line:{
        flex:1,
        height:1,
        backgroundColor:"#ccc",
    },
    textLink:{
        textAlign:"center",
        marginTop:50,
    },
    link:{
        color:"#4CAF50",
        fontWeight:"bold",
    },

})

export default LoginComponent;