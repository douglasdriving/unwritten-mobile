import { Text, View, TextInput } from 'react-native';
import { styles } from '../../style';

export const InputArea = (props) => {

  const inputFieldStyle = {
    backgroundColor: 'white',
    padding: 0,
    height: (props.fieldHeight ? props.fieldHeight : 30),
    alignItems: 'flex-start',
  };

  return(
    <View>
      <Text style={styles.h2}>{props.label}</Text>
      <TextInput style={inputFieldStyle} multiline={true}></TextInput>
    </View>
  );
}

