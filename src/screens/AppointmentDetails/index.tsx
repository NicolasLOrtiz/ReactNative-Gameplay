import React, {useEffect, useState} from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Platform,
  Share,
  Text,
  View
} from "react-native";
import {BorderlessButton} from "react-native-gesture-handler";
import {Background} from "../../components/Background";
import Header from "../../components/Header";
import {Fontisto} from "@expo/vector-icons";
import {theme} from "../../global/styles/theme";
import BannerImg from "../../assets/banner.png";
import {styles} from "./styles";
import {ListHeader} from "../../components/ListHeader";
import {Member, MemberProps} from "../../components/Member";
import ListDivider from "../../components/ListDivider";
import {ButtonIcon} from "../../components/ButtonIcon";
import {useRoute} from "@react-navigation/native";
import {AppointmentProps} from "../../components/Appointment";
import {api} from "../../service/api";
import Spinner from "../../components/Spinner";
import * as Linking from "expo-linking";

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();

  const {guildSelected} = route.params as Params;

  const fetchGuildInfo = async () => {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

      setWidget(response.data);
    } catch (error) {
      Alert.alert("Erro ao carregar dados da guilda");
    } finally {
      setIsLoading(false);
    }
  }

  const handleShareInvitation = () => {
    const message = Platform.OS === "ios" ?
      `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    })
  }

  const handleOpenGuild = () => {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildInfo();
  }, [])

  const membersMock = [
    {
      id: "1",
      username: "Nícolas",
      avatar_url: "https:/github.com/NicolasLOrtiz.png",
      status: "online",
    },
    {
      id: "2",
      username: "João",
      avatar_url: "https:/github.com/NicolasLOrtiz.png",
      status: "offline",
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
            <BorderlessButton onPress={handleShareInvitation}>
                <Fontisto name="share" size={24} color={theme.colors.primary}/>
            </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {isLoading ? (
        <Spinner/>
      ) : (
        <>
          <ListHeader title="Jogadores"
                      subtitle={`Total ${widget.members.length}`}/>

          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Member data={item}/>}
            ItemSeparatorComponent={() => <ListDivider isCentered/>}
            style={styles.members}
          />
        </>
      )}

      {
        guildSelected.guild.owner && (
          <View style={styles.footer}>
            <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild}/>
          </View>
        )
      }
    </Background>
  );
}
