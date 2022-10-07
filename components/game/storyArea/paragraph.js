import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../../style';

const exampleAuth = '1. Smogg';
const exampleText = 'Once upon a time there was a dear little girl who was loved by every one who looked at her, but most of all by her grandmother, and there was nothing that she would not have given to the child.';

export const Paragraph = () => {
  return (
    <View>
      <Text style={styles.body}>{exampleAuth}</Text>
      <Text style={styles.body}>{exampleText}</Text>
    </View>
  );
}