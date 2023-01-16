import { View, Text } from "react-native";
import { styles, textColors, colors } from "../../../../../style";
// import { TimeToHms } from "../../../../../helpers/helpers";
import { Space } from "../../../../smart/visuals";
import { Actions } from "./actions";
// import { useSelector } from "react-redux";
// import { selectTimeLeftInTurn } from "../../../../../redux/roomSlice";
import { TurnTimer } from "../../../../smart/turnTimer";

export const YourTurnField = (props) => {

  // const timeLeftInTurn = useSelector(selectTimeLeftInTurn);
  const playerJustJoined = props.turnNumber < 5;

  return (
    <>
      <View style={styles.actionBox}>
        {Space(5)}
        <Text style={styles.h1}>
          {playerJustJoined ?
            'Wanna join this story?' :
            'Your turn!'
          }
        </Text>
        <Text style={[styles.paragraph, textColors.white]}>
          {playerJustJoined ?
            'Write a continuation to this story within 30 minutes to participate' :
            'You got 500 new characters to write with'
          }
        </Text>
        <Actions {...props} />
      </View>
      {Space(20)}
      <TurnTimer color={colors.dark} roomId={props.roomId}/>
    </>
  );
}