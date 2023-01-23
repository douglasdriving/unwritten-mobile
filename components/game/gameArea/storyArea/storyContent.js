import { Text, View } from 'react-native';
import { Divider, Space } from '../../../smart/visuals.js';
import { colors, styles } from '../../../../style.js';
import { useSelector } from 'react-redux';
import { selectReadOnly, selectTitle, selectDescription, selectPlayerCount, selectAllPlayers } from '../../../../redux/roomSlice.js';
import { StoryBody } from './storyBody/storyBody.js';

export const StoryContent = () => {

  const readOnly = useSelector(selectReadOnly);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const allPlayers = useSelector(selectAllPlayers);

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
          <Text style={{fontSize: 50, marginBottom: 20}}>🏕️</Text>
          <Text style={[styles.h1, { color: colors.black}]}>{title}</Text>
          <Text style={[styles.h3, { color: colors.black}]}>{description}</Text>
          {/* <Divider/> */}
          {readOnly &&
            <Text style={[styles.h3, { color: colors.black }]}>{GenerateAuthorText()}</Text>
          }
          {Space(10)}
          <StoryBody/>
        </>
      }
    </View>
  );
}

