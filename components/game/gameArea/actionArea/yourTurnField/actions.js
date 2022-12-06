import { View, Text, Button } from "react-native";
import { turnWhenCanEnd, maxScenarioCount } from "../../../../../backend/dataGeneration";
import { colors, styles } from "../../../../../style";
import { MyButton } from "../../../../smart/myButton";

export const Actions = (props) => {

  const turnsUntilCanEnd = turnWhenCanEnd - props.story.scenarios.length;
  const turnsUntilMustEnd = maxScenarioCount - props.story.scenarios.length;

  const HandleContinue = () => {
    props.SetWritingField('continuation');
  }

  const HandleWriteEnding = () => {
    props.SetWritingField('ending');
  }

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <MyButton
        title={`Write Continuation${turnsUntilCanEnd <= 0 ? (' (' + turnsUntilMustEnd + ' turns left') : ''}`}
        onPress={HandleContinue}
        color={colors.fire}
        textColor={colors.dark}
        flex
      />
      <MyButton
        title={`Write Ending${turnsUntilCanEnd >= 0 ? (' (Available in ' + turnsUntilCanEnd + ' turns)') : ''}`}
        onPress={HandleWriteEnding}
        disabled={turnsUntilCanEnd >= 0}
        color={colors.fire}
        textColor={colors.dark}
        flex
      />
    </View>
  );
}