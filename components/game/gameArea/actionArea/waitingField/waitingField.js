import { View, Text } from "react-native";
import { styles } from "../../../../../style";
import { TurnTimer } from "../../../../smart/turnTimer";
import { useSelector } from "react-redux";
import { selectNextPlayer } from "../../../../../redux/roomSlice";

export const WaitingField = () => {

  const nextPlayer = useSelector(selectNextPlayer);

  return (
    <View style={styles.actionBox}>
      <Text style={styles.h3}>It's {nextPlayer.name}'s turn to write</Text>
      <TurnTimer/>
    </View>
  );

}