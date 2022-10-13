import { Text, View, Button, ScrollView, TextInput } from 'react-native';
import { InputArea } from './inputArea';
import { styles } from '../../style';
import { useState, useEffect } from 'react';
import { GetStoryKeys } from '../../backendCalls/backendCalls';
import { Spacer } from '../visuals';

export const OpenRoom = () => {

  const [storyKeys, setStoryKeys] = useState();
  const [storyTitle, setStoryTitle] = useState();
  const [storyDescription, setStoryDescription] = useState();
  const [storyOpening, setStoryOpening] = useState();

  const LoadStoryKeys = async () => {
    const keys = await GetStoryKeys();
    setStoryKeys(keys);
    return;
  }

  useEffect(() => { LoadStoryKeys() }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Open Room</Text>
      <Text style={styles.body}>Open a new writing room and create a new story with other players</Text>
      <Text style={styles.body}>🔑 {storyKeys}</Text>
      {
        (storyKeys > 0) ?
          (
            <View>
              <Text style={styles.h2}>Story Title</Text>
              <TextInput style={styles.inputFieldStyle} multiline={true} onChangeText={setStoryTitle}></TextInput>

              <Text style={styles.h2}>Story Description</Text>
              <TextInput style={{...styles.inputFieldStyle, height: 150, textAlignVertical: 'top'}} multiline={true} onChangeText={setStoryDescription}></TextInput>

              <Text style={styles.h2}>Story Opening</Text>
              <TextInput style={{...styles.inputFieldStyle, height: 150, textAlignVertical: 'top'}} multiline={true} onChangeText={setStoryOpening}></TextInput>

              <Button title='🔑 Open Room'></Button>

              <Spacer/>
            </View>
          )
          :
          (
            <Text>Opening a new room requires story keys! Earn more keys by helping out with finishing other stories.</Text>
          )
      }

    </ScrollView>
  );
}