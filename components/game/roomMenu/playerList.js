import { View } from "react-native";
import { PlayerRow } from "./playerRow";
import { useSelector } from "react-redux";
import { selectAllPlayers } from "../../../redux/roomSlice";

export const PlayerList = () => {

  const activePlayers = useSelector(selectAllPlayers);

  return (
    <View>

      {activePlayers.map((player, i) => (
        <PlayerRow
          player={player}
          key={player.id}
        />
      ))}

    </View>
  );
}