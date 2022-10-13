import { Text, View, Button, ScrollView, TextInput } from 'react-native';
import { InputArea } from './inputArea';
import { styles } from '../../style';
import { useState, useEffect } from 'react';
import { GetStoryKeys, CreateNewRoom } from '../../backendCalls/backendCalls';
import { Spacer } from '../visuals';
import { Popup } from '../popup';

export const OpenRoom = (props) => {

  const premiumUser = props.premiumUser;

  const [storyKeys, setStoryKeys] = useState();
  const [storyTitle, setStoryTitle] = useState();
  const [storyDescription, setStoryDescription] = useState();
  const [storyOpening, setStoryOpening] = useState();
  const [tryingToOpen, setTryingToOpen] = useState(false);
  const [opening, setOpening] = useState(false);

  const ToggleTryingToOpen = () => {
    setTryingToOpen(!tryingToOpen);
  }

  const StartOpening = async () => {
    setOpening(true);
    //create a room in the backend - and receive an id
    const newRoomId = await CreateNewRoom();
    props.appNavigation.navigate('Game', newRoomId);
  }

  const LoadStoryKeys = async () => {
    const keys = await GetStoryKeys();
    setStoryKeys(keys);
    return;
  }

  const FieldsReady = () => {
    return (storyTitle && storyDescription && storyOpening);
  }

  useEffect(() => { LoadStoryKeys() }, []);

  return (
    //this could be separated into 2 components! one for the story form and one for the non-prem user info
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Open Room</Text>
      {
        premiumUser ?

          <View>
            <Text style={styles.body}>Open a new writing room and create a new story with other players</Text>
            <Text style={styles.body}>🔑 {storyKeys}</Text>
            {
              (storyKeys > 0) ?
                (
                  <View>
                    <Text style={styles.h2}>Story Title</Text>
                    <TextInput style={styles.inputFieldStyle} multiline={true} onChangeText={setStoryTitle}></TextInput>

                    <Text style={styles.h2}>Story Description</Text>
                    <TextInput style={{ ...styles.inputFieldStyle, height: 150, textAlignVertical: 'top' }} multiline={true} onChangeText={setStoryDescription}></TextInput>

                    <Text style={styles.h2}>Story Opening</Text>
                    <TextInput style={{ ...styles.inputFieldStyle, height: 150, textAlignVertical: 'top' }} multiline={true} onChangeText={setStoryOpening}></TextInput>

                    <Button title='🔑 Open Room' disabled={!FieldsReady()} onPress={ToggleTryingToOpen} />

                    {tryingToOpen && <Popup
                      title='Open the room?'
                      text={'Opening this room will cost  1🔑️. You currently have ' + storyKeys}
                      onClose={ToggleTryingToOpen}
                      buttons={[
                        {
                          title: 'Open 🔑️',
                          handlePress: (() => {ToggleTryingToOpen(); StartOpening()})
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

          :

          <View>
            <Text>Join Unwritten to open new rooms and start your own stories!</Text>
            <Button title='Join Unwritten' onPress={() => { props.appNavigation.navigate('Join') }} />
          </View>
      }

    </ScrollView>

  );

}