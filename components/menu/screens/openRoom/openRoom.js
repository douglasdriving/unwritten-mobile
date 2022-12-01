import { Text, View, Button, ScrollView, TextInput } from 'react-native';
import { styles } from '../../../../style';
import { useState, useEffect } from 'react';
import { GetStoryKeys, CreateRoom } from '../../../../backend/backendCalls';
import { Space, Spacer } from '../../../smart/visuals';
import { Popup } from '../../../smart/popup';
import { MenuScreenHeader } from '../../modularComponents/menuScreenHeader';
import { useFocusEffect } from '@react-navigation/native';
import { ErrorText } from '../../modularComponents/errorText';
import { Modal } from 'react-native';
import { FocusInputField } from '../../../smart/focusInputField';

export const OpenRoom = (props) => {

  const [storyKeys, setStoryKeys] = useState();

  const [titleInput, setTitleInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [startingScenario, setStartingScenario] = useState();

  const [tryingToOpen, setTryingToOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(true);

  /*
  ok this is a pretty tricky challenge
  but I think we could do it really cleverly with a single component
  somthing that, when pressed, expands a popup field that covers the whole space and that you can write in
  it should probably just appear "above" the other content, since then we dont have to hide other stuff
  similar to a popup
  */

  const [roomCreateError, setRoomCreateError] = useState();

  const ToggleTryingToOpen = () => {
    setTryingToOpen(!tryingToOpen);
  }

  const StartOpening = async () => {

    setOpening(true);
    const response = await CreateRoom(titleInput, descriptionInput, startingScenario);
    if (response.success) {
      ClearFields();
      props.navigation.navigate('Game', { roomId: response.roomId });
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
    <View style={{ ...styles.container, justifyContent: 'center' }}>

      <FocusInputField label='test'/>

      <Text style={styles.h1}>Open Room</Text>
      <Text style={styles.paragraph}>🔑  {storyKeys}</Text>

      <Text style={styles.body}>
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
          <Text style={styles.h3}>Story Title</Text>
          <TextInput
            style={styles.inputField}
            multiline={true}
            onChangeText={setTitleInput}
            value={titleInput}
          />
          <Text style={styles.h3}>Story Description</Text>
          <TextInput
            style={{ ...styles.inputField, flex: 1, textAlignVertical: 'top' }}
            multiline={true}
            onChangeText={setDescriptionInput}
            value={descriptionInput}
          />
          <Text style={styles.h3}>Story Opening Text</Text>
          <TextInput
            style={{ ...styles.inputField, flex: 1, textAlignVertical: 'top' }}
            multiline={true}
            onChangeText={setStartingScenario}
            value={startingScenario}
          // onFocus={make a writing window appear}
          />
          {Space(15)}
          <Button title='🔑 Open Room' disabled={!FieldsReady()} onPress={ToggleTryingToOpen} />
        </>
      }

      <ErrorText message={roomCreateError} />

      {tryingToOpen && <Popup
        title='Open the room?'
        text={'Opening this room will cost  1🔑️. You currently have ' + storyKeys}
        onClose={ToggleTryingToOpen}
        buttons={[
          {
            title: 'Open 🔑️',
            handlePress: (() => { ToggleTryingToOpen(); StartOpening() })
          },
          {
            title: 'Cancel',
            handlePress: ToggleTryingToOpen
          }
        ]}
      />}

      {opening && <Popup
        title='🔑️ Opening Room...'
        loading={true}
      />}

    </View>

  );

}