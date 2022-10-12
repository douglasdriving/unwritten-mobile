import { Text, View, Button, ScrollView } from 'react-native';
import { InputArea } from './inputArea';
import { styles } from '../../style';
import { useState, useEffect } from 'react';
import { GetStoryKeys } from '../../backendCalls/backendCalls';

export const OpenRoom = () => {

  const [storyKeys, setStoryKeys] = useState();

  const LoadStoryKeys = async () => {
    const keys = await GetStoryKeys();
    setStoryKeys(keys);
    return;
  }

  useEffect(() => {LoadStoryKeys()}, [])

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Open Room</Text>
      <Text style={styles.body}>Open a new writing room and create a new story with other players</Text>
      <Text style={styles.body}>🔑 {storyKeys}</Text>
      {
        (storyKeys > 0) ?
        (
          <View>
            <InputArea label='Story Title'></InputArea>
            <InputArea label='Story Description' fieldHeight={100}></InputArea>
            <InputArea label='Story Opening Text' fieldHeight={200}></InputArea>
            <Button title='🔑 Open Room'></Button>
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