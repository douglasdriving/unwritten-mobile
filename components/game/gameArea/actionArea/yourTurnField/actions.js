import { View, Text, Button } from "react-native";

export const Actions = (props) => {

  const HandleContinue = () =>{
    props.SetWritingField('continuation');
  }

  const HandleWriteEnding = () =>{
    props.SetWritingField('ending');
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Button title="Continue" onPress={HandleContinue}/>
        <Text>{(props.turnsUntilCanEnd <= 0) && (props.turnsUntilMustEnd + ' turns left')}</Text>
      </View>
      <View>
        <Button title="Write Ending" onPress={HandleWriteEnding} disabled={props.turnsUntilCanEnd >= 0}/>
        <Text>{(props.turnsUntilCanEnd >= 0) && ('Available in ' + props.turnsUntilCanEnd + 'turns')}</Text>
      </View>
    </View>
  );
}