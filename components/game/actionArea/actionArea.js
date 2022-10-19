import { useLinkProps } from "@react-navigation/native";
import { View, Text } from "react-native";
import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";

export const ActionArea = (props) => {

  //when writing in the field, input new char count to props.updateCharsRemaining
  //should be several different things that can render here depending on the state of the game
  //1.

  return (
    <View>
      <YourTurnField charsRemaining={props.charsRemaining}/>
      {/* <WritingField
        charsRemaining={props.charsRemaining}
        updateCharsRemaining={props.updateCharsRemaining}
      /> */}
    </View>
  );
}