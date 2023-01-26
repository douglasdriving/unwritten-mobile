import { View, Text } from "react-native";
import { useEffect } from "react";
import { colors, styles } from "../../../../../style";

export const CharCounter = (props) => {

  const {color} = props;

  useEffect(() => {
    if (props.chars == null || props.chars == undefined) console.error('no chars var passed onto CharCounter props');
  }, []);

  return (
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
      <Text style={[styles.paragraph, {color: color || colors.white}]}>{props.chars} </Text>
    </View>
  );
}