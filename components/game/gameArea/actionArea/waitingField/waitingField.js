import { View, Text } from "react-native";
import { styles, gameStyle, textColors, colors } from "../../../../../style";
import { TurnTimer } from "../../../../smart/turnTimer";
import { useSelector } from "react-redux";
import { selectNextPlayer } from "../../../../../redux/roomSlice";

export const WaitingField = () => {

  const nextPlayer = useSelector(selectNextPlayer);

  return (
    <View style={gameStyle.actionBox}>
      <Text style={[styles.h3, textColors.light]}>It's {nextPlayer.name}'s turn to write</Text>
      <TurnTimer color={colors.light}/>
    </View>
  );

}