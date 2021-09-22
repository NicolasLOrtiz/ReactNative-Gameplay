import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { theme } from "../../global/styles/theme";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";

type HeaderProps = {
  title: string;
  action?: ReactNode;
};

export default function Header({ title, action }: HeaderProps) {
  const { secondary100, secondary40, heading } = theme.colors;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={heading} />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {action && <View>{action}</View>}
    </LinearGradient>
  );
}
