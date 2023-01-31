import { View, Text } from "react-native";
import { styles, textColors, colors, gameStyle, textColors2, colors2 } from "../../../../../style";
import { Space } from "../../../../smart/visuals";
import { Actions } from "./actions";
import { TurnTimer } from "../../../../smart/turnTimer";
import { selectScenarioCount } from "../../../../../redux/roomSlice";
import { useSelector } from "react-redux";

export const YourTurnField = (props) => {

  //wanna be able to select the scenario count
  const scenarioCount = useSelector(selectScenarioCount);
  const playerJustJoined = scenarioCount < 4;

  return (
    <>
      <View style={gameStyle.actionBox}>
        {Space(5)}
        <Text style={[styles.h1, textColors2.white]}>
          {playerJustJoined ?
            'Wanna join this story?' :
            'Your turn!'
          }
        </Text>
        <Text style={[styles.paragraph, textColors2.white]}>
          {playerJustJoined ?
            'Write a continuation to this story within 30 minutes to participate' :
            'You got 500 new characters to write with'
          }
        </Text>
        <Actions {...props}/>
      </View>
      {Space(20)}
      <TurnTimer color={colors2.white}/>
    </>
  );
}