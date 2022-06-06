import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

type ListDividerProps = {
  isCentered?: boolean;
};

export default function ListDivider({ isCentered = false }: ListDividerProps) {
  return (
    <View
      style={[
        styles.container,
        isCentered
          ? { marginVertical: 12 }
          : { marginTop: 2, marginBottom: 31 },
      ]}
    />
  );
}
