import { View, Text } from "react-native";
import { TurnCountDown } from "../actionArea/turnCountDown";
import { PlayerRow } from "./playerRow";

export const PlayerList = (props) =>{

  return(
    <View>
      <PlayerRow player={props.players.creator} isNextPlayer={props.nextPlayer == 0} />
      {props.players.authors.map((player, i) => (
        <PlayerRow player={player} isNextPlayer={i == props.nextPlayer + 1}/>
      ))}
    </View>
  );
}