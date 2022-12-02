import { View } from "react-native";
import { PlayerRow } from "./playerRow";

export const PlayerList = (props) => {

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