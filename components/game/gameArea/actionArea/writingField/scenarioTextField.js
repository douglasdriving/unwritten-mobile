import { View, TextInput } from "react-native";

export const ScenarioTextField = (props) => {

  if (!props.handleChangeText) throw new Error('no handleChangeText prop passed down onto ScenarioTextField');

  return (
    <View>
      <TextInput
        style={{
          padding: 10,
          height: 300,
          textAlignVertical: 'top',
          fontSize: 16,
          borderStyle: 'solid',
          borderColor: (props.isWriting == 'ending' ? 'darkred' : 'blue'),
          borderWidth: 2,
        }}
        onChangeText={props.handleChangeText}
        multiline={true}
      />
    </View>
  );
}