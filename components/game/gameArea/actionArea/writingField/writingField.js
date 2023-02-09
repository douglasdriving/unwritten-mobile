import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { CharCounter } from "./charCounter";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/userSlice";
import { UploadScenario } from "../../../../../backend/backendCalls";
import { Popup } from "../../../../smart/popup";
import { colors, colors2, gameStyle, styles, textColors2 } from "../../../../../style";
import { MyButton } from "../../../../smart/myButton";
import { selectRoomId, selectPrompt, selectScenarioCount } from "../../../../../redux/roomSlice";
import { Divider, Space } from "../../../../smart/visuals";
import { TurnTimer } from "../../../../smart/turnTimer";

export const WritingField = () => {

  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);
  const [scenarioPostSuccess, setScenarioPostSuccess] = useState(false);
  const [scenarioText, setScenarioText] = useState('');
  const [warning, setWarning] = useState();
  const user = useSelector(selectUser);
  const roomId = useSelector(selectRoomId);
  const prompt = useSelector(selectPrompt);
  const scenarioCount = useSelector(selectScenarioCount);

  if (!user) console.error('missing a user in redux store of writingField');

  const handleUpload = async (end) => {

    if (scenarioText.length < 1) {
      setWarning('Paragraph needs at least one character');
      return;
    }
    if (scenarioText.length > 600) {
      setWarning('The paragraph is too long');
      return;
    }

    setScenarioPostLoading(true);
    let scenarioUploadResponse = await UploadScenario(scenarioText, roomId, end);
    if (scenarioUploadResponse.ok) setScenarioPostSuccess(true);
    else setWarning(scenarioUploadResponse.message);
    setScenarioPostLoading(false);

  }

  return (
    <View style={gameStyle.actionBox}>

      <Text style={[styles.h3, textColors2.light]}>{prompt || 'Write something.'}</Text>

      <TextInput
        style={{
          textAlignVertical: 'top',
          fontSize: 16,
          flex: 1,
          color: colors2.white,
        }}
        onChangeText={(text) => { setScenarioText(text); }}
        multiline
        autoFocus
      />

      <Divider color={colors2.white} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
        <MyButton
          title='Add'
          disabled={scenarioText.length > 600 || scenarioText.length < 1}
          onPress={() => handleUpload(false)}
          color={colors2.light}
          textColor={colors2.night}
          width={100}
        />
        <MyButton
          title='End'
          disabled={scenarioText.length > 600 || scenarioText.length < 1 || scenarioCount < 30}
          onPress={() => handleUpload(true)}
          color={colors2.orange}
          textColor={colors2.night}
          width={100}
        />
        <CharCounter chars={600 - scenarioText.length} color={colors2.white} />
      </View>

      {warning && <Text style={{ ...styles.warning }}>{warning}</Text>}

      {Space(10)}

      <TurnTimer />

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