import React from "react";
import { Image, StyleSheet } from "react-native";
import AvatarProfil from "../assets/images/avatar.svg";

const Avatar = ({ imageUri, style }) => {
  if (imageUri) {
    return <Image source={{ uri: imageUri }} style={[styles.avatar, style]} />;
  }

  return <AvatarProfil style={style} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
});

export default Avatar;
