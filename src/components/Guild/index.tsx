import React from "react";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { styles } from "./styles";
import { GuildIcon } from "../GuildIcon";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";

export type GuildProps = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
};

type Props = TouchableOpacityProps & {
  data: GuildProps;
};

const Guild = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <GuildIcon />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
        </View>

        <Text style={styles.type}>
          {data.owner ? "Administrador" : "Convidado"}
        </Text>
      </View>

      <Feather name="chevron-right" color={theme.colors.heading} size={24} />
    </TouchableOpacity>
  );
};

export default Guild;