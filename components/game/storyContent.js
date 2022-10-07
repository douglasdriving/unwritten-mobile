import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { Paragraph } from './paragraph.js';

export const StoryContent = () => {
  return (
    <View>
      <Text style={styles.h1}>Little Red Riding Hood</Text>
      <Text style={styles.h2}>The story of a girl with a red riding hood who encounter a dangerous wolf while visiting her grandma in the woods</Text>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
      <Paragraph/>
    </View>
  );
}