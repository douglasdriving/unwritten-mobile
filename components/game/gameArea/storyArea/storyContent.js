import { Text, View } from 'react-native';
import { Divider } from '../../../smart/visuals.js';
import { Paragraph } from './paragraph.js';
import { styles } from '../../../../style.js';

export const StoryContent = (props) => {
  return (
    <View>
      <Text style={styles.h1}>{props.story.title}</Text>
      <Text style={styles.h2}>{props.story.description}</Text>
      {props.readOnly && <Text style={styles.h3}>{GenerateAuthorText(props.players)}</Text>}
      {props.readOnly && <Divider />}
      {props.story.scenarios.map((scenario, i) =>
        <Paragraph
          scenario={scenario}
          scenarioNumber={i + 1}
          key={i}
          isUser={props.user.id == scenario.creator_id}
          authorName = {props.players.filter(player => (player.id == scenario.creator_id))[0].name}
        />
      )}
    </View>
  );
}

const GenerateAuthorText = (players) => {

  let text = 'Written by';

  players.forEach((player, i) => {
    if(i==0) text += (' ' + player.name);
    else if (i == players.length - 1) text += (' and ' + player.name);
    else text += (', ' + player.name);
  });

  return text;

}