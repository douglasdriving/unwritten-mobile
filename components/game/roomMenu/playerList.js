import { View } from "react-native";
import { PlayerRow } from "./playerRow";

export const PlayerList = (props) => {

  // console.log('players: ', props.players);
  // console.log('next player id: ', props.nextPlayerId);

  return (
    <View>

      {props.players.map((player, i) => (
        <PlayerRow
          {...props}
          player={player}
          isNextPlayer={player.id == props.nextPlayerId}
          key={player.id}
        />
      ))}

    </View>
  );
}