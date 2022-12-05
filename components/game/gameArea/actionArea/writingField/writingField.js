import { View, Text, Button, TextInput, Modal } from "react-native";
import { useState, useEffect } from "react";
import { CharCounter } from "./charCounter";
import { ScenarioTextField } from "./scenarioTextField";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../../redux/userSlice";
import { GetChars, UploadScenario } from "../../../../../backend/backendCalls";
import { Popup } from "../../../../smart/popup";
import { styles } from "../../../../../style";
import { MyButton } from "../../../../smart/myButton";

export const WritingField = (props) => {

  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);
  const [scenarioText, setScenarioText] = useState('');
  const [chars, setChars] = useState({ total: 0, remaining: 0 });
  const [warning, setWarning] = useState();
  const user = useSelector(selectUser);

  const handleChangeText = text => {
    setScenarioText(text);
    setChars({
      total: chars.total,
      remaining: chars.total - text.length
    })
  }
  const handleAddButtonPress = async () => {

    if (scenarioText.length < 1) {
      setWarning('scenario must contain at least one character!')
      return;
    }
    if (chars.remaining < 0) {
      setWarning('not enough characters!')
      return;
    }

    setScenarioPostLoading(true);

    const uploadSuccess = await UploadScenario(scenarioText, props.roomId);

    if (uploadSuccess) {
      await props.LoadRoomData();
    }
    else {
      setWarning('failed to add scenario. Please try again...')
    }

    setScenarioPostLoading(false);
  }
  const handleBackButtonPress = async () => {
    if (!props.SetWritingField) {
      console.error('no SetWritingField passed into props of writingField -> Cant go back');
      return;
    }
    props.SetWritingField(null);
  }
  const loadChars = async () => {

    const loadedChars = await GetChars(props.roomId, user.id);
    if (!loadedChars) {
      console.error('unable to load chars from backend into the writing field component');
      return;
    }
    setChars({
      total: loadedChars,
      remaining: loadedChars
    })

  }

  if (!props.turnNumber) console.error('no turnNumber provided in writingField props');
  if (!user) console.error('missing a user in redux store of writingField');
  if (!props.isWriting) console.error('missing "isWriting" in props of writingField');

  useEffect(() => { loadChars(); }, []);

  return (
    <View style={styles.actionBox}>
      {/* <Button title="<-" color='gray' onPress={handleBackButtonPress} /> */}
      {/* <Text style={styles.paragraph}>{props.turnNumber}. {user.name}</Text> */}
      {/* <ScenarioTextField handleChangeText={handleChangeText} isWriting={props.isWriting} /> */}
      <TextInput
        style={{
          textAlignVertical: 'top',
          fontSize: 16,
          flex: 1
        }}
        onChangeText={handleChangeText}
        multiline
        autoFocus
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
        <MyButton
          title={props.isWriting == 'ending' ? 'Add Ending' : 'Add'}
          disabled={chars.remaining < 0 || scenarioText.length < 1}
          onPress={handleAddButtonPress}
          color={props.isWriting == 'ending' ? 'darkred' : 'blue'}
        />
        <CharCounter chars={chars.remaining} />
      </View>
      {warning && <Text style={{ ...styles.warning }}>{warning}</Text>}
      {scenarioPostLoading && <Popup
        title={'Adding your text'}
        loading={true}
      />}
    </View>
  );
}