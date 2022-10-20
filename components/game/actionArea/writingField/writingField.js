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
    //show a "load" popup, probs by changing some "upload" state
    const success = await props.AddScenario(scenarioText);
    console.log('scenario uploaded: ', success);
    //depending on if success is true or false, should change screen in some way
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
      <Text>{writingEnd && 'Write Continuation Instead'}</Text>
    </View>
  );
}