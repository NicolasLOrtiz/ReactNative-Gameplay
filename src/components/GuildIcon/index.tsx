import React from "react";
import { View, Text, Image } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./styles";

export function GuildIcon() {
  const uri =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Flogodownload.org%2Fdiscord-logo%2Fdiscord-logo-1-2%2F&psig=AOvVaw0UG5wL0IwY-OCN1LzOPTZb&ust=1631741895027000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCJD68rO2__ICFQAAAAAdAAAAABAJ";

  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
