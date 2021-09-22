import React, { ReactNode } from "react";
import { View, Text, ModalProps, Modal } from "react-native";
import { Background } from "../Background";
import { styles } from "./styles";

type ModalViewProps = ModalProps & {
  children: ReactNode;
};

const ModalView = ({ children, ...rest }: ModalViewProps) => {
  return (
    <Modal transparent animationType="slide" {...rest}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Background>
            <View style={styles.bar} />
            {children}
          </Background>
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;
