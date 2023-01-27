import { View, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { CharCounter } from "./charCounter";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../../redux/userSlice";
import { GetChars, UploadScenario, UploadEnding } from "../../../../../backend/backendCalls";
import { Popup } from "../../../../smart/popup";
import { colors, gameStyle, styles, textColors } from "../../../../../style";
import { MyButton } from "../../../../smart/myButton";
import { selectRoomId, loadRoomData } from "../../../../../redux/roomSlice";
import { Divider, Space } from "../../../../smart/visuals";
import { GetRandomInt } from "../../../../../helpers/helpers";

export const WritingField = (props) => {

  if (!props.isWriting) console.error('missing "isWriting" in props of writingField')

  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);
  const [scenarioPostSuccess, setScenarioPostSuccess] = useState(false);
  const [scenarioText, setScenarioText] = useState('');
  const [chars, setChars] = useState({ total: 0, remaining: 0 });
  const [warning, setWarning] = useState();
  const [suggestion, setSuggestion] = useState();
  const user = useSelector(selectUser);
  const isEnd = props.isWriting == 'ending';
  const roomId = useSelector(selectRoomId);

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

  const getSuggestions = async () => {

    const suggestions = [
      'A new character is introduced',
      'Something is sacrificed',
      'The main character gets a great idea',
      'The main character gets a terrible idea',
      'Someone makes a bad mistake',
      'An animal appears',
      'Someone thinks hard',
      'The surroundings are described',
      'A loud noise suddenly breaks in',
      'There is a moment of calm',
      'Someone does something unexpected',
      'A prior question is answered',
      'The character remembers something',
      'A wild pokemon appears',
    ]

    const random = GetRandomInt(0, suggestions.length - 1);
    const pick = suggestions[random];

    setSuggestion(pick);

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
    <View style={gameStyle.actionBox}>

      {suggestion && <Text style={[styles.h3, textColors.light]}>{suggestion}:</Text>}

      <TextInput
        style={{
          textAlignVertical: 'top',
          fontSize: 16,
          flex: 1,
          color: colors.light,
        }}
        onChangeText={handleChangeText}
        multiline
        autoFocus
      />

      <Divider />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
        <MyButton
          title={'Suggestion'}
          onPress={getSuggestions}
          color={colors.light}
          textColor={colors.white}
          flex
        />
        <View style={{ width: 10 }} />
        <MyButton
          title={isEnd ? 'Add Ending' : 'Add'}
          disabled={chars.remaining < 0 || scenarioText.length < 1}
          onPress={handleAddButtonPress}
          color={colors.light}
          textColor={colors.white}
          flex
        />
        <CharCounter chars={chars.remaining} color={colors.light} />
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