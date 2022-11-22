import { Text, TextInput } from 'react-native';

export const LabeledInput = (props) => {

  return (
    <>
      <Text>{props.label}</Text>
      <TextInput
        onChangeText={props.onChangeText}
        style={{
          backgroundColor: 'white',
          width: '100%',
          padding: 0,
        }}
        secureTextEntry={props.label=='Password'}/>
    </>
  );
}