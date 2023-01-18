import { Text, View } from 'react-native';
import { Divider, Space } from '../../../smart/visuals.js';
import { Paragraph } from './paragraph.js';
import { colors, styles } from '../../../../style.js';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../redux/userSlice.js';
import { selectReadOnly } from '../../../../redux/roomSlice.js';

export const StoryContent = (props) => {

  const [allPlayers, setAllPlayers] = useState([]);
  const userId = useSelector(selectUserId);
  const readOnly = useSelector(selectReadOnly);

  const ListAllPlayers = async () => {

    if (!props.players) return;
    if (props.players.length < 1) return;

    setAllPlayers(props.players);

    if (!props.inActivePlayers) return;
    if (props.inActivePlayers.length < 1) return;
    setAllPlayers([...allPlayers, ...props.inActivePlayers]);

  }

  useEffect(() => { ListAllPlayers(); }, [props.players, props.inActivePlayers]);

  const GenerateAuthorText = () => {

    let text = 'Written by';

    allPlayers.forEach((player, i) => {
      if (i == 0) text += (' ' + player.name);
      else if (i == allPlayers.length - 1) text += (' and ' + player.name);
      else text += (', ' + player.name);
    });

    return text;

  }

  const GetPlayerName = (id) => {

    if (!allPlayers || allPlayers.length < 1) return '';

    const filtered = allPlayers.filter(player => player.id == id);
    const player = filtered[0];

    if (!player) return '';
    const name = player.name;
    return name;

  }

  return (
    <View>
      {allPlayers.length > 0 &&
        <>
          <Text style={[styles.h1, { color: colors.black }]}>{props.story.title}</Text>
          <Text style={[styles.h3, { color: colors.black }]}>{props.story.description}</Text>
          {readOnly && <Text style={[styles.h3, { color: colors.black }]}>{GenerateAuthorText()}</Text>}

          {Space(10)}

          {props.story.scenarios.map((scenario, i) =>
            <Paragraph
              scenario={scenario}
              scenarioNumber={i + 1}
              key={i}
              isUser={userId == scenario.creator_id}
              authorName={GetPlayerName(scenario.creator_id)}
            />
          )}
        </>
      }
    </View>
  );
}

