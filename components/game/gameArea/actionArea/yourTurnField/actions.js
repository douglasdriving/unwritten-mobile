import { View } from "react-native";
import { colors } from "../../../../../style";
import { MyButton } from "../../../../smart/myButton";

export const Actions = (props) => {

  const turnWhenCanEnd = 30;
  const turnWhenMustEnd = 40;

  const scenarioCount = props.story.scenarios.length;

  const canEnd = (scenarioCount >= (turnWhenCanEnd - 1));
  const mustEnd = (scenarioCount >= turnWhenMustEnd);

  const turnsUntilCanEnd = turnWhenCanEnd - scenarioCount - 1;
  const turnsUntilMustEnd = turnWhenMustEnd - scenarioCount;

  const HandleContinue = () => {
    props.SetWritingField('continuation');
  }

  const HandleWriteEnding = () => {
    props.SetWritingField('ending');
  }

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <MyButton
        title={`Write Continuation${(canEnd && !mustEnd) ? (' (' + turnsUntilMustEnd + ' turns left)') : ''}`}
        onPress={HandleContinue}
        disabled={mustEnd}
        color={colors.fire}
        textColor={colors.dark}
        flex
      />
      <MyButton
        title={`Write Ending${(!canEnd) ? (' (Available in ' + turnsUntilCanEnd + ' turns)') : ''}`}
        onPress={HandleWriteEnding}
        disabled={!canEnd}
        color={colors.fire}
        textColor={colors.dark}
        flex
      />
    </View>
  );
}