import { Text, View, Button, ScrollView, TextInput } from 'react-native';
import { styles } from '../../../../style';
import { useState, useEffect } from 'react';
import { GetStoryKeys, CreateRoom } from '../../../../backend/backendCalls';
import { Spacer } from '../../../smart/visuals';
import { Popup } from '../../../smart/popup';
import { MenuScreenHeader } from '../../modularComponents/menuScreenHeader';
import { useFocusEffect } from '@react-navigation/native';
import { ErrorText } from '../../modularComponents/errorText';

export const OpenRoom = (props) => {

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
    if(response.success){
      ClearFields();
      props.navigation.navigate('Game', { roomId: response.roomId });
    }
    else{
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
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Open Room</Text>
      {
        // props.user.premium ?

        <View>
          <Text style={styles.body}>Open a new writing room and create a new story with other players</Text>
          <Text style={styles.body}>🔑 {storyKeys}</Text>
          {
            (storyKeys > 0) ?
              (
                <View>
                  <Text style={styles.h2}>Story Title</Text>
                  <TextInput
                    style={styles.inputFieldStyle}
                    multiline={true}
                    onChangeText={setTitleInput}
                    value={titleInput}
                  />

                  <Text style={styles.h2}>Story Description</Text>
                  <TextInput
                    style={{ ...styles.inputFieldStyle, height: 150, textAlignVertical: 'top' }}
                    multiline={true}
                    onChangeText={setDescriptionInput}
                    value={descriptionInput}
                  />

                  <Text style={styles.h2}>Story Opening Text</Text>
                  <TextInput
                    style={{ ...styles.inputFieldStyle, height: 150, textAlignVertical: 'top' }}
                    multiline={true}
                    onChangeText={setStartingScenario}
                    value={startingScenario}
                  />

                  <Button title='🔑 Open Room' disabled={!FieldsReady()} onPress={ToggleTryingToOpen} />

                  <ErrorText message={roomCreateError}/>

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

                  <Spacer />
                </View>
              )
              :
              (
                <Text>Opening a new room requires story keys! Earn more keys by helping out with finishing other stories.</Text>
              )
          }
        </View>

        // :

        // <View>
        //   <Text>Join Unwritten to open new rooms and start your own stories!</Text>
        //   <Button title='Join Unwritten' onPress={() => { props.navigation.navigate('Join') }} />
        // </View>
      }

    </ScrollView>

  );

}