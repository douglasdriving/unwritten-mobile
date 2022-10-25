import { View, Text } from "react-native";

export const CharCounter = (props) => {

  if (!props.charsRemaining) console.error('no charsRemaining var passed onto CharCounter props');

  return(
    <View style={{flexDirection: 'row'}}>
      <Text>{props.charsRemaining} </Text>
      <View style={{width:20, height: 20, backgroundColor: 'gray'}}>
        <Text style={{color:'white', fontWeight:'bold', textAlign: 'center', textAlignVertical: 'center'}}>C</Text>
      </View>
    </View>
  );
}