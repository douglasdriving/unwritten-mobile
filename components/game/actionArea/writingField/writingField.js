import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../../../../style";
import { CharCounter } from "./charCounter";

export const WritingField = () => {

  const writingEnd = false;

  return (
    <View>
      <Text style={styles.body}>6. Douglas</Text>
      <TextInput style={styles.writingField}></TextInput>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button title='Add'></Button>
        <CharCounter/>
      </View>
      <Text>{writingEnd && 'Write Continuation Instead'}</Text>
    </View>
  );
}