import { View } from "react-native";
import { PlayerRow } from "./playerRow";

export const PlayerList = (props) => {

  return (
    <View>

      {props.players && <PlayerRow
        player={props.players.creator}
        isNextPlayer={props.nextPlayer == 0}
        {...props}
      />}

      {props.players.authors && props.players.authors.map((player, i) => (
        <PlayerRow
          {...props}
          player={player}
          isNextPlayer={i == props.nextPlayer - 1}
          key={player.id}
        />
      ))}

    </View>
  );
}