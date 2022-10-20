import { View, Text } from "react-native";
import { TurnCountDown } from "../actionArea/turnCountDown";

export const PlayerRow = (props) =>{
  return(
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 5,
      backgroundColor: 'lightgray',
    }}>
      <Text>{props.player.name}</Text>
      {props.isNextPlayer && <TurnCountDown/>}
    </View>
  );
}