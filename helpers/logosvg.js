import React from "react";
import { View, StyleSheet } from "react-native";
import LogoLight from '../assets/images/logo-light.svg'; 

const LogoSvg = ({ style }) => {
    return (
        <View style={style}>
            <LogoLight width="100%" height="100%" />
        </View>
    );
};

export default LogoSvg;
