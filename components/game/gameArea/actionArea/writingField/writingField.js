import { View, Text, Button } from "react-native";
import { useState } from "react";
import { CharCounter } from "./charCounter";
import { ScenarioTextField } from "./scenarioTextField";
import { UploadScenario } from "../../../../../backend/backendCalls";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../../../redux/userSlice";

export const WritingField = (props) => {

  const [scenarioText, setScenarioText] = useState('');
  const userName = useSelector(selectUserName);
  
  const handleChangeText = text => {
    setScenarioText(text);

    if(!props.updateCharsRemaining){
      console.error('no updateCharsRemaining prop passed down onto WritingField, cant update char counter');
      return;
    } 

    props.updateCharsRemaining(text.length);
  }

  const handleAddButtonPress = async () => {
    if(!props.AddScenario){
      console.error('no AddScenaro propped passed down into WritingField. Can add scenario');
      return;
    }
    if(scenarioText.length < 1){
      console.error('scenario text must contain at least 1 character!');
      return
    }
    const success = await props.AddScenario(scenarioText);

    if(!success){
      console.error('failed to add the scenario');
      return;
    }
  }

  const handleBackButtonPress = async () => {
    if(!props.SetWritingField){
      console.error('no SetWritingField passed into props of writingField -> Cant go back');
      return;
    }
    props.SetWritingField(null);
  }

  if(!props.turnNumber) console.error('no turnNumber provided in writingField props');
  if(!userName) console.error('missing a username in redux store of writingField');
  if(!props.isWriting) console.error('missing "isWriting" in props of writingField');

  return (
    <View>
      <Button title="<-" color='gray' onPress={handleBackButtonPress}/>
      <Text style={{ color: 'blue' }}>{props.turnNumber}. {userName}</Text>
      <ScenarioTextField handleChangeText={handleChangeText} isWriting={props.isWriting}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title={props.isWriting == 'ending' ? 'Add Ending' : 'Add'}
          disabled={!(props.charsRemaining >= 0) || scenarioText.length < 1}
          onPress={handleAddButtonPress}
          color={props.isWriting == 'ending' ? 'darkred' : 'blue'}
        />
        <CharCounter {...props} />
      </View>
    </View>
  );
}