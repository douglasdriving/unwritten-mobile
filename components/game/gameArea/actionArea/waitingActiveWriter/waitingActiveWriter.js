import { View, Text } from "react-native";
import { styles, gameStyle, textColors, colors, textColors2, colors2 } from "../../../../../style";
import { TurnTimer } from "../../../../smart/turnTimer";
import { useSelector } from "react-redux";
import { selectLastNode } from "../../../../../redux/roomSlice";

export const WaitingActiveWriter = () => {

  const lastNode = useSelector(selectLastNode);

  return (
    <View style={gameStyle.actionBox}>
      <Text style={[styles.h3, textColors2.white]}>{lastNode.creator_name} is currently adding to this story. Wait for them to finish, or until the timer runs out, before you can add</Text>
      <TurnTimer color={colors2.white} reloadOnZero />
    </View>
  );

}