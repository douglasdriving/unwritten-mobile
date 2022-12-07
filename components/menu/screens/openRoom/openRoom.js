import { Text, View, Button, TextInput } from 'react-native';
import { colors, styles } from '../../../../style';
import { useState, useEffect } from 'react';
import { GetStoryKeys, CreateRoom } from '../../../../backend/backendCalls';
import { Space } from '../../../smart/visuals';
import { Popup } from '../../../smart/popup';
import { useFocusEffect } from '@react-navigation/native';
import { ErrorText } from '../../modularComponents/errorText';
import { FocusInputField } from '../../../smart/focusInputField';
import { navigate, navigateToRoom } from '../../../../contexts/rootNavigation';
import { MyButton } from '../../../smart/myButton';

export const OpenRoom = () => {

  const [storyKeys, setStoryKeys] = useState();

  const [titleInput, setTitleInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [startingScenario, setStartingScenario] = useState();

  const [tryingToOpen, setTryingToOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [roomCreateError, setRoomCreateError] = useState();

  const ToggleTryingToOpen = () => {
    setTryingToOpen(!tryingToOpen);
  }

  const StartOpening = async () => {

    setOpening(true);
    const response = await CreateRoom(titleInput, descriptionInput, startingScenario);
    if (response.success) {
      ClearFields();
      navigateToRoom(response.roomId)
    }
    else {
      setRoomCreateError(response.message);
      setOpening(false);
    }

  }

  const LoadStoryKeys = async () => {
    const keys = await GetStoryKeys();
    setStoryKeys(keys);
    return;
  }

  const FieldsReady = () => {
    return (titleInput && descriptionInput && startingScenario);
  }

  const ClearFields = () => {
    setDescriptionInput('');
    setStartingScenario('');
    setTitleInput('');
  }

  useFocusEffect(() => { LoadStoryKeys() });
  useEffect(() => setRoomCreateError(null), [titleInput, descriptionInput, startingScenario]);

  return (
    <View style={{ ...styles.container, justifyContent: 'flex-start' }}>

      <Text style={styles.h1}>Open Room</Text>
      <Text style={[styles.paragraph, { color: colors.white }]}>🪵  {storyKeys}</Text>

      <Text style={[styles.body, { color: colors.white }]}>
        {
          storyKeys > 0 ?
            'Open a new writing room and create a new story with other players' :
            'Opening a new room requires story keys! Earn keys by participating in other stories.'
        }
      </Text>

      {
        (storyKeys > 0) &&
        <>
          {Space(10)}

          <FocusInputField
            label='Story Title'
            oneLine
            setText={text => { setTitleInput(text) }}
            height={40}
          />
          <FocusInputField
            label='Story Description'
            setText={text => { setDescriptionInput(text) }}
            height={'20%'}
          />
          <FocusInputField
            label='Opening Text'
            setText={text => { setStartingScenario(text) }}
            height={'20%'}
          />
          {Space(15)}
          <MyButton
            title='🪵 Open Room'
            disabled={!FieldsReady()}
            onPress={ToggleTryingToOpen}
            color={colors.fire}
            textColor={colors.dark}
          />
        </>
      }

      <ErrorText message={roomCreateError} />

      {tryingToOpen && <Popup
        title='Open the room?'
        text={'Opening this room will cost  1🪵. You currently have ' + storyKeys}
        onClose={ToggleTryingToOpen}
        buttons={[
          {
            title: 'Open 🪵',
            handlePress: (() => { ToggleTryingToOpen(); StartOpening() })
          }
        ]}
      />}

      {opening && <Popup
        title='🪵 Opening Room...'
        loading={true}
      />}

    </View>

  );

}