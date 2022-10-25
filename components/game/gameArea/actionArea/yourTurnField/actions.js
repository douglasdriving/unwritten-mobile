import { View, Text, Button } from "react-native";
import { turnWhenCanEnd, maxScenarioCount } from "../../../../../backend/dataGeneration";

export const Actions = (props) => {

  const turnsUntilCanEnd = turnWhenCanEnd - props.story.scenarios.length;
  const turnsUntilMustEnd = maxScenarioCount - props.story.scenarios.length;

  const HandleContinue = () =>{
    props.SetWritingField('continuation');
  }

  const HandleWriteEnding = () =>{
    props.SetWritingField('ending');
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Button title="Continue" onPress={HandleContinue}/>
        <Text>{(turnsUntilCanEnd <= 0) && (turnsUntilMustEnd + ' turns left')}</Text>
      </View>
      <View>
        <Button title="Write Ending" onPress={HandleWriteEnding} disabled={turnsUntilCanEnd >= 0}/>
        <Text>{(turnsUntilCanEnd >= 0) && ('Available in ' + turnsUntilCanEnd + 'turns')}</Text>
      </View>
    </View>
  );
}