import { View, Text } from "react-native";
import { TurnCountDown } from "../actionArea/turnCountDown";

export const PlayerRow = () =>{
  return(
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 5,
      backgroundColor: 'lightgray',
    }}>
      <Text>Smogg</Text>
      <TurnCountDown/>
    </View>
  );
}