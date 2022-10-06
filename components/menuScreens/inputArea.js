import { Text, View, TextInput } from 'react-native';
import { styles } from '../../style';

export const InputArea = (props) => {

  const inputFieldStyle = {
    backgroundColor: 'white',
    padding: 0,
    height: (props.fieldHeight ? props.fieldHeight : 30),
    textAlignVertical: (props.fieldHeight ? 'top' : 'center'),
    fontSize: 16,
  };

  return(
    <View>
      <Text style={styles.h2}>{props.label}</Text>
      <TextInput style={inputFieldStyle} multiline={true}></TextInput>
    </View>
  );
}

