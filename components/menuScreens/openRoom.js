import { Text, View, Button, ScrollView } from 'react-native';
import { InputArea } from './inputArea';
import { styles } from '../../style';

export const OpenRoom = () => {

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Open Room</Text>
      <Text style={styles.body}>Open a new writing room and create a new story with other players</Text>
      <Text style={styles.body}>🔑 3</Text>
      <InputArea label='Story Title'></InputArea>
      <InputArea label='Story Description' fieldHeight={100}></InputArea>
      <InputArea label='Story Opening Text' fieldHeight={200}></InputArea>
      <Button title='🔑 Open Room'></Button>
    </ScrollView>
  );
}