import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {theme} from "../../global/styles/theme";

import {styles} from "./styles";

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary}/>
    </View>
  );
};

export default Spinner;
