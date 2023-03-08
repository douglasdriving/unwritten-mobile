import React from "react";
import { View, Text } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { colors2, styles, textColors2 } from "../../../../style";

export function Title({ }) {
  return <View style={{
    alignItems: 'center'
  }}>
    <Ionicon name="bonfire" size={50} color={colors2.orange} />
    <Text style={[styles.title, textColors2.light, styles.textCenter]}>Unwritten</Text>
  </View>;
}
