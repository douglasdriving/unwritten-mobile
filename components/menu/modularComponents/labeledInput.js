import { Text, TextInput } from 'react-native';
import { styles } from '../../../style';

export const LabeledInput = (props) => {

  return (
    <>
      <Text style={styles.paragraph}>{props.label}</Text>
      <TextInput
        onChangeText={props.onChangeText}
        style={styles.inputField}
        secureTextEntry={props.label == 'Password'}
        onSubmitEditing={props.onSubmitEditing}
      />

    </>
  );
}