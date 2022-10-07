import { View, Text } from "react-native";
import { TurnCountDown } from "../actionArea/turnCountDown";
import { PlayerRow } from "./playerRow";

export const PlayerList = () =>{
  return(
    <View>
      <PlayerRow/>
      <PlayerRow/>
      <PlayerRow/>
      <PlayerRow/>
    </View>
  );
}