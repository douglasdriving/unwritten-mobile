import { View, Text } from "react-native";
import { useEffect } from "react";

export const CharCounter = (props) => {

  useEffect(() => {
    if (props.chars == null || props.chars == undefined) console.error('no chars var passed onto CharCounter props');
  }, []);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{props.chars} </Text>
      <View style={{ width: 20, height: 20, backgroundColor: 'gray' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }}>C</Text>
      </View>
    </View>
  );
}