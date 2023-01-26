import { View, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { CharCounter } from "./charCounter";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../../redux/userSlice";
import { GetChars, UploadScenario, UploadEnding } from "../../../../../backend/backendCalls";
import { Popup } from "../../../../smart/popup";
import { colors, styles } from "../../../../../style";
import { MyButton } from "../../../../smart/myButton";
import { selectRoomId, loadRoomData } from "../../../../../redux/roomSlice";

export const WritingField = (props) => {

  if (!props.isWriting) console.error('missing "isWriting" in props of writingField')

  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);
  const [scenarioPostSuccess, setScenarioPostSuccess] = useState(false);
  const [scenarioText, setScenarioText] = useState('');
  const [chars, setChars] = useState({ total: 0, remaining: 0 });
  const [warning, setWarning] = useState();
  const user = useSelector(selectUser);
  const isEnd = props.isWriting == 'ending';
  const roomId = useSelector(selectRoomId);
  const dispatch = useDispatch();

  if (!user) console.error('missing a user in redux store of writingField');
  ;

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

    let scenarioUploadResponse
    if (isEnd) {
      scenarioUploadResponse = await UploadEnding(scenarioText, roomId);
    }
    else {
      scenarioUploadResponse = await UploadScenario(scenarioText, roomId);
    }

    if (scenarioUploadResponse.ok) {
      setScenarioPostSuccess(true);
    }
    else {
      setWarning(scenarioUploadResponse.message);
    }

    setScenarioPostLoading(false);


  }

  const handleSucessWindowClose = async () => {

    await dispatch(loadRoomData({ id: roomId }));
    setScenarioPostSuccess(false);

  }

  const loadChars = async () => {

    const loadedChars = await GetChars(roomId, user.id);
    if (!loadedChars) {
      console.error('unable to load chars from backend into the writing field component');
      return;
    }
    setChars({
      total: loadedChars,
      remaining: loadedChars
    })

  }

  useEffect(() => { loadChars(); }, []);

  return (
    <View style={styles.actionBox}>

      <TextInput
        style={{
          textAlignVertical: 'top',
          fontSize: 16,
          flex: 1,
          color: colors.white
        }}
        onChangeText={handleChangeText}
        multiline
        autoFocus
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
        <MyButton
          title={isEnd ? 'Add Ending' : 'Add'}
          disabled={chars.remaining < 0 || scenarioText.length < 1}
          onPress={handleAddButtonPress}
          color={colors.fire}
          textColor={colors.light}
          flex
        />
        <CharCounter chars={chars.remaining} />
      </View>

      {warning && <Text style={{ ...styles.warning }}>{warning}</Text>}

      {scenarioPostLoading && <Popup
        title={'Adding your text'}
        loading={true}
      />}

      {scenarioPostSuccess &&
        <Popup
          title={'🎉🎉🎉'}
          text={'Story Extended Successfully!!!'}
          textCenter
          textColor={colors.green}
        />
      }

    </View>
  );
}