import { View } from "react-native";
import { PlayerRow } from "./playerRow";
import { useSelector } from "react-redux";
import { selectActivePlayers, selectNextPlayer } from "../../../redux/roomSlice";

export const PlayerList = (props) => {

  const activePlayers = useSelector(selectActivePlayers);
  const nextPlayer = useSelector(selectNextPlayer);

  return (
    <View>

      {activePlayers.map((player, i) => (
        <PlayerRow
          roomId={props.roomId}
          player={player}
          isNextPlayer={nextPlayer && player.id == nextPlayer.id}
          key={player.id}
        />
      ))}

    </View>
  );
}