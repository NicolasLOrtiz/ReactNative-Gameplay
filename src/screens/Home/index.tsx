import {useNavigation} from "@react-navigation/core";
import React, {useCallback, useState} from "react";
import {FlatList, View} from "react-native";
import {Appointment, AppointmentProps} from "../../components/Appointment";
import {Background} from "../../components/Background";
import {ButtonAdd} from "../../components/ButtonAdd";
import {CategorySelect} from "../../components/CategorySelect";
import ListDivider from "../../components/ListDivider";
import {ListHeader} from "../../components/ListHeader";
import {Profile} from "../../components/Profile";
import {styles} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {COLLECTION_APPOINTMENTS} from "../../configs/database";
import Spinner from "../../components/Spinner";
import {useFocusEffect} from "@react-navigation/native";

export const Home = () => {
  const [category, setCategory] = useState("");
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const appointmentsMock = [
    {
      id: "1",
      guild: {
        id: "1",
        name: "Lendários",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 às 20:40h",
      description:
        "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
    },
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate("AppointmentDetails", {
      guildSelected,
    });
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  const loadAppointments = async () => {
    const storageAppointments = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const appointments: AppointmentProps[] = storageAppointments ? JSON.parse(storageAppointments) : [];

    if (category) {
      setAppointments(appointments.filter(appointment => appointment.category === category));
    } else {
      setAppointments(appointments);
    }

    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  return (
    <Background>
      <View style={styles.header}>
        <Profile/>
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {
        isLoading ?
          <Spinner/>
          :
          <>
            <ListHeader title="Partidas agendadas"
                        subtitle={`Total de ${appointments.length}`}/>

            <FlatList
              data={appointmentsMock}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <Appointment data={item}
                             onPress={() => handleAppointmentDetails(item)}/>
              )}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider/>}
              contentContainerStyle={{paddingBottom: 69}}
            />
          </>
      }
    </Background>
  );
};
