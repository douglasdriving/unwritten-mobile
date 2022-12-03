import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import { CharCounter } from "./charCounter";
import { ScenarioTextField } from "./scenarioTextField";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../../redux/userSlice";
import { GetChars } from "../../../../../backend/backendCalls";

export const WritingField = (props) => {


  const [scenarioText, setScenarioText] = useState('');
  const [chars, setChars] = useState({total: 0, remaining: 0});
  const user = useSelector(selectUser);
  
  const handleChangeText = text => {
    setScenarioText(text);
    setChars({
      total: chars.total,
      remaining: chars.total - text.length
    })
  }
  const handleAddButtonPress = async () => {
    if(!props.AddScenario){
      console.error('no AddScenaro propped passed down into WritingField. Cant add scenario');
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
  const loadChars = async () => {

    const loadedChars = await GetChars(props.roomId, user.id);
    if(!loadedChars){
      console.error('unable to load chars from backend into the writing field component');
      return;
    }
    setChars({
      total: loadedChars,
      remaining: loadedChars
    })

  }

  if(!props.turnNumber) console.error('no turnNumber provided in writingField props');
  if(!user) console.error('missing a user in redux store of writingField');
  if(!props.isWriting) console.error('missing "isWriting" in props of writingField');

  useEffect(() => {loadChars();}, []);

  return (
    <View>
      <Button title="<-" color='gray' onPress={handleBackButtonPress}/>
      <Text style={{ color: 'blue' }}>{props.turnNumber}. {user.name}</Text>
      <ScenarioTextField handleChangeText={handleChangeText} isWriting={props.isWriting}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title={props.isWriting == 'ending' ? 'Add Ending' : 'Add'}
          disabled={chars.remaining < 0 || scenarioText.length < 1}
          onPress={handleAddButtonPress}
          color={props.isWriting == 'ending' ? 'darkred' : 'blue'}
        />
        {chars.remaining && <CharCounter chars={chars.remaining} />}
      </View>
    </View>
  );
}