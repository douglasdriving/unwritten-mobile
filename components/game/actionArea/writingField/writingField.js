import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../../../../style";
import { CharCounter } from "./charCounter";
import { useState } from "react";

export const WritingField = (props) => {

  const [scenarioText, setScenarioText] = useState('');

  const writingEnd = false;

  const handleChangeText = text => {
    setScenarioText(text);
    props.updateCharsRemaining(text.length);
  }

  const handleButtonPress = async() => {
    const success = await props.AddScenario(scenarioText);
    //if false, there should be some sort of error feedback on screen
  }

  return (
    <View>
      <Text style={styles.body}>6. Douglas {/* CHANGE TO THE RIGHT SCENARIO NUMBER AND LOGGED USER NAME */}</Text> 
      <TextInput //breakout component?
        style={styles.writingField}
        onChangeText={handleChangeText}
        multiline={true}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button //breakout component?
          title='Add'
          disabled={!(props.charsRemaining >= 0)}
          onPress={handleButtonPress}
        />
        <CharCounter charsRemaining={props.charsRemaining} />
      </View>
      <Text>{props.isWriting == 'ending' && 'Write Continuation Instead'}</Text>
    </View>
  );
}