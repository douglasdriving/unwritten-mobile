import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../../../../style";
import { CharCounter } from "./charCounter";

export const WritingField = (props) => {

  const writingEnd = false;

  const handleChangeText = newText => {
    props.updateCharsRemaining(newText.length);
    // not good! it should calc based on initial value
  }

  return (
    <View>
      <Text style={styles.body}>6. Douglas</Text>
      <TextInput style={styles.writingField} onChangeText={handleChangeText} multiline={true}></TextInput>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button title='Add' disabled={!(props.charsRemaining >= 0)}></Button>
        <CharCounter charsRemaining={props.charsRemaining}/>
      </View>
      <Text>{writingEnd && 'Write Continuation Instead'}</Text>
    </View>
  );
}