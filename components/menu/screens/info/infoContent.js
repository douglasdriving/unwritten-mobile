import React from "react";
import { ScrollView, Text } from "react-native";
import { News } from "../frontPage/news/news";
import { styles, textColors2 } from "../../../../style";
import { InstructionText } from "./instructionText";

export function InfoContent({ }) {
  return (
    <ScrollView>
      <Text style={[styles.h2, textColors2.white]}>Instructions</Text>
      <InstructionText />
      <Text style={[styles.h2, textColors2.white]}>Latest Update</Text>
      <News />
    </ScrollView>
  );
}
