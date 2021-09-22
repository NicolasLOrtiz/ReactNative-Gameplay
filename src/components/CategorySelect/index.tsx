import React from "react";
import { Image, Text, View } from "react-native";
import {
  RectButton,
  RectButtonProps,
  ScrollView,
} from "react-native-gesture-handler";
import DiscordImg from "../../assets/discord.png";
import { styles } from "./styles";
import { categories } from "../../utils/categories";
import { Category } from "../Category";

type CategoryProps = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
};

export function CategorySelect({
  categorySelected,
  setCategory,
  hasCheckBox = false,
}: CategoryProps) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === categorySelected}
          onPress={() => setCategory(category.id)}
          hasCheckBox={hasCheckBox}
        />
      ))}
    </ScrollView>
  );
}
