import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../../style.js';
import { Paragraph } from './paragraph.js';
import { Divider } from '../../visuals.js';

export const StoryContent = (props) => {
  return (
    <View>
      <Text style={styles.h1}>Little Red Riding Hood</Text>
      <Text style={styles.h2}>The story of a girl with a red riding hood who encounter a dangerous wolf while visiting her grandma in the woods</Text>
      {props.readOnly && <Text style={styles.h3}>Written by Smogg, Sebbe, Joakim, and Noobalot</Text>}
      {props.readOnly && <Divider/>}
      <Paragraph/>
      <Paragraph/>
    </View>
  );
}