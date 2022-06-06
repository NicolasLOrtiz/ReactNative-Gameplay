import React from "react";
import {Alert, Text, View} from "react-native";
import {Avatar} from "../Avatar";
import {styles} from "./styles";
import {useAuth} from "../../hooks/useAuth";
import {RectButton} from "react-native-gesture-handler";

export function Profile() {
  const {user, signOut} = useAuth()

  const handleSignOut = () => {
    Alert.alert('Logout', 'Deseja realmente sair?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          await signOut()
        }
      }
    ])
  }


  return (
    <View style={styles.container}>
      <RectButton>
        <Avatar urlImage={user.avatar}/>
      </RectButton>


      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>

        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  );
}
