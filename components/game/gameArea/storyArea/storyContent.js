import { Text, View } from 'react-native';
import { Divider } from '../../../smart/visuals.js';
import { Paragraph } from './paragraph.js';
import { styles } from '../../../../style.js';
import { useState, useEffect } from 'react';

export const StoryContent = (props) => {

  const [allPlayers, setAllPlayers] = useState([]);

  const ListAllPlayers = async () => {
    if (!props.players) return;
    if (props.players.length < 1) return;

    console.log('players: ', props.players);
    console.log('players.length: ', props.players.length);
    await setAllPlayers(props.players);
    console.log('all players set to: ', allPlayers);

    if (!props.inactivePlayers) return;
    if (props.inactivePlayers.length < 1) return;
    allPlayers = [...allPlayers, ...inactivePlayers];
  }

  useEffect(() => {ListAllPlayers}, [props.players, props.inactivePlayers]);

  const GenerateAuthorText = () => {

    let text = 'Written by';

    allPlayers.forEach((player, i) => {
      if (i == 0) text += (' ' + player.name);
      else if (i == allPlayers.length - 1) text += (' and ' + player.name);
      else text += (', ' + player.name);
    });

    return text;

  }

  return (
    <View>
      {allPlayers.length > 0 &&
        <>
          <Text style={styles.h1}>{props.story.title}</Text>
          <Text style={styles.h2}>{props.story.description}</Text>
          {props.readOnly && <Text style={styles.h3}>{GenerateAuthorText()}</Text>}
          {props.readOnly && <Divider />}
          {props.story.scenarios.map((scenario, i) =>
            <Paragraph
              scenario={scenario}
              scenarioNumber={i + 1}
              key={i}
              isUser={props.user.id == scenario.creator_id}
              authorName={allPlayers.filter(player => (player.id == scenario.creator_id))[0].name}
            />
          )}
        </>
      }
    </View>
  );
}

