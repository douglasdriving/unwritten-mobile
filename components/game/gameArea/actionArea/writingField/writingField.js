import { View, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { CharCounter } from "./charCounter";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../../redux/userSlice";
import { GetChars, UploadScenario, UploadEnding, GetRandomPrompt } from "../../../../../backend/backendCalls";
import { Popup } from "../../../../smart/popup";
import { colors, colors2, gameStyle, styles, textColors, textColors2 } from "../../../../../style";
import { MyButton } from "../../../../smart/myButton";
import { selectRoomId, loadRoomData, selectPrompt } from "../../../../../redux/roomSlice";
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
  const prompt = useSelector(selectPrompt);

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

  // const getSuggestions = async () => {

  //   setSuggestion('...');

  //   // const suggestions = [
  //   //   'A new character is introduced',
  //   //   'Something is sacrificed',
  //   //   'The main character gets a great idea',
  //   //   'The main character gets a terrible idea',
  //   //   'Someone makes a bad mistake',
  //   //   'An animal appears',
  //   //   'Someone thinks hard',
  //   //   'The surroundings are described',
  //   //   'A loud noise suddenly breaks in',
  //   //   'There is a moment of calm',
  //   //   'Someone does something unexpected',
  //   //   'A prior question is answered',
  //   //   'The character remembers something',
  //   //   'A wild pokemon appears',
  //   // ]

  //   // const random = GetRandomInt(0, suggestions.length - 1);
  //   // const pick = suggestions[random];

  //   const prompt = await GetRandomPrompt();

  //   setSuggestion(prompt);

  // }

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

      <Text style={[styles.h3, textColors2.light]}>{prompt}</Text>

      <TextInput
        style={{
          textAlignVertical: 'top',
          fontSize: 16,
          flex: 1,
          color: colors2.white,
        }}
        onChangeText={handleChangeText}
        multiline
        autoFocus
      />

      <Divider color={colors2.white} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
        {/* <MyButton
          title={'Suggestion'}
          onPress={getSuggestions}
          color={colors2.light}
          textColor={colors2.night}
          flex
          disabled={suggestion == '...'}
        /> */}
        {/* <View style={{ width: 10 }} /> */}
        <MyButton
          title={isEnd ? 'Add Ending' : 'Add'}
          disabled={chars.remaining < 0 || scenarioText.length < 1}
          onPress={handleAddButtonPress}
          color={colors2.light}
          textColor={colors2.night}
          width={100}
        // flex
        />
        <CharCounter chars={chars.remaining} color={colors2.white} />
      </View>

      {warning && <Text style={{ ...styles.warning }}>{warning}</Text>}

      {/* {suggestion && <Text style={[styles.h3, textColors2.white]}>{suggestion}</Text>} */}

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