import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../../style.js';
import { Paragraph } from './paragraph.js';
import { Divider } from '../../visuals.js';

export const StoryContent = (props) => {
  return (
    <View>
      <Text style={styles.h1}>{props.story.title}</Text>
      <Text style={styles.h2}>{props.story.description}</Text>
      {props.readOnly && <Text style={styles.h3}>Written by Smogg, Sebbe, Joakim, and Noobalot</Text>}
      {props.readOnly && <Divider />}
      {props.story.scenarios.map((scenario, i) =>
        <Paragraph
          scenario={scenario}
          scenarioNumber={i + 1}
          key={scenario.id}
          isUser={props.user.name == scenario.author.name}
        />
      )}
    </View>
  );
}