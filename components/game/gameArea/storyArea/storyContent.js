import { Text, View } from 'react-native';
import { Space } from '../../../smart/visuals.js';
import { colors, styles } from '../../../../style.js';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectReadOnly, selectTitle, selectDescription } from '../../../../redux/roomSlice.js';
import { StoryBody } from './storyBody/storyBody.js';

export const StoryContent = (props) => {

  const [allPlayers, setAllPlayers] = useState([]);
  const readOnly = useSelector(selectReadOnly);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);

  const ListAllPlayers = async () => {

    if (!props.players) return;
    if (props.players.length < 1) return;

    setAllPlayers(props.players);

    if (!props.inActivePlayers) return;
    if (props.inActivePlayers.length < 1) return;
    setAllPlayers([...allPlayers, ...props.inActivePlayers]);

  } //could be a function in redux -> retrieve the list.

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

  return (
    <View>
      {allPlayers.length > 0 &&
        <>
          <Text style={[styles.h1, { color: colors.black }]}>{title}</Text>
          <Text style={[styles.h3, { color: colors.black }]}>{description}</Text>
          {readOnly && <Text style={[styles.h3, { color: colors.black }]}>{GenerateAuthorText()}</Text>}
          {Space(10)}
          <StoryBody allPlayers={allPlayers} />
        </>
      }
    </View>
  );
}

