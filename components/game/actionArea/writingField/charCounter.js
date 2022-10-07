import { View, Text, Image } from "react-native";

export const CharCounter = () => {
  return(
    <View style={{flexDirection: 'row'}}>
      <Text>514 </Text>
      <View style={{width:20, height: 20, backgroundColor: 'gray'}}>
        <Text style={{color:'white', fontWeight:'bold', textAlign: 'center', textAlignVertical: 'center'}}>C</Text>
      </View>
    </View>
  );
}