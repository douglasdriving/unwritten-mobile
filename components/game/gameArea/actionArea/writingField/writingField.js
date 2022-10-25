import { View, Text, Button } from "react-native";
import { useState } from "react";
import { CharCounter } from "./charCounter";
import { ScenarioTextField } from "./scenarioTextField";

export const WritingField = (props) => {

  const [scenarioText, setScenarioText] = useState('');

  const writingEnd = false;

  const handleChangeText = text => {
    setScenarioText(text);
    props.updateCharsRemaining(text.length);
  }

  const handleAddButtonPress = async () => {
    const success = await props.AddScenario(scenarioText);
    //if false, there should be some sort of error feedback on screen
  }

  const handleBackButtonPress = async () => {
    props.SetWritingField(null);
  }

  return (
    <View>
      <Button title="<-" color='gray' onPress={handleBackButtonPress}/>
      <Text style={{ color: 'blue' }}>{props.turnNumber}. {props.user.name}</Text>
      <ScenarioTextField handleChangeText={handleChangeText} isWriting={props.isWriting}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title={props.isWriting == 'ending' ? 'Add Ending' : 'Add'}
          disabled={!(props.charsRemaining >= 0)}
          onPress={handleAddButtonPress}
          color={props.isWriting == 'ending' ? 'darkred' : 'blue'}
        />
        <CharCounter charsRemaining={props.charsRemaining} />
      </View>
    </View>
  );
}