import React from "react";
import { View, Text, TextInputProps, TextInput } from "react-native";
import { styles } from "./styles";

const SmallInput = ({ ...rest }: TextInputProps) => {
  return (
    <TextInput style={styles.container} keyboardType="numeric" {...rest} />
  );
};

export default SmallInput;
