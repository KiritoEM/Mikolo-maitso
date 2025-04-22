import React,{useState} from "react";
import { View,Image,StyleSheet,TextInput,Text,TouchableOpacity } from "react-native";
import Button from "../../shared/ui/button/button";
import LogoSvg from "../../../helpers/logosvg";
import { MaterialIcons,Ionicons } from "@expo/vector-icons";

const InscriptionComponent =() =>{
    const [ pseudo, setPseudo] = useState('');
    const [ email, setEmail] = useState('');
    const [ motDePasse, setMotDePasse ] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const validation =()=>
    {
        console.log("compte crée");
    }

    return(
        <View style={styles.container}>
            {/* <Image source={require('../../../assets/logo.png')} style={styles.image} /> */}
            <LogoSvg style={styles.logo}/>
            <Text style={styles.title}>Créer un compte</Text>

            <View style={styles.input}>
            <MaterialIcons name="person" size={22} color="#999" style={styles.icon} />

                <TextInput
                style={{flex: 1}}
                placeholder="Pseudo"
                value={pseudo}
                onChangeText={setPseudo}
                />
            </View>

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

            <Button title="Créer un compte" onPress={validation}/>

            <Text style={styles.textLink}>Vous avez déja un compte?<Text style={styles.link}> Se connecter</Text> </Text>

        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        margin:20,
    },

    logo:{
        width:200,
        height:200,
        alignItems:"center",
        marginLeft:20,
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

    textLink:{
        textAlign:"center",
        marginTop:50,
    },
    link:{
        color:"#4CAF50",
        fontWeight:"bold",
    },
    image:{
        width: 140, 
        height: 50,
        alignSelf: 'center',
        marginBottom: 30
    }

});
export default InscriptionComponent;
