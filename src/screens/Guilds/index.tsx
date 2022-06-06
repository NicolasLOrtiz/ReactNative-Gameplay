import React, {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import Guild, {GuildProps} from "../../components/Guild";
import ListDivider from "../../components/ListDivider";
import {styles} from "./styles";
import Spinner from "../../components/Spinner";
import {api} from "../../service/api";

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

const Guilds = ({handleGuildSelect}: Props) => {
  const [guilds, setGuilds] = useState<GuildProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchGuilds = async () => {
    try {
      const response = await api("/users/@me/guilds");

      setGuilds(response.data);
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGuilds();
  }, [])

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)}/>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider isCentered/>}
        contentContainerStyle={{paddingBottom: 68, paddingTop: 103}}
        style={styles.guilds}
        ListHeaderComponent={() => <ListDivider isCentered/>}
      />
    </View>
  );
};

export default Guilds;
