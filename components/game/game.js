import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { useEffect, useState } from 'react';
import { GetRoomData, LogAllRooms, loggedUser } from '../../backendCalls/backendCalls.js';
import { maxScenarioCount } from '../../backendCalls/dataGeneration.js';
import { GetRandomInt } from '../../helperFunctions/helpers.js';
import { GenerateRandomPlayer } from '../../backendCalls/dataGeneration.js';

export const Game = (props) => {

  const [readOnly, setReadOnly] = useState("false");
  const [players, setPlayers] = useState([]);
  const [chars, setChars] = useState({initial: 0, remaining: 0});

  const SetInitialStates = async () => {

    const room = await GetRoomData(props.route.params.roomId);

    setReadOnly(room.scenarios.length >= maxScenarioCount);

    setPlayers({
      creator: room.creator,
      authors: room.authors
    });

    if (!readOnly) {
      if (players.creator.name == loggedUser.name) setChars({initial: players.creator.charsRemaining, remaining: players.creator.charsRemaining});
      else if (players.authors) {
        players.authors.forEach(author => {
          if (author.name == loggedUser.name) setChars({initial: author.charsRemaining, remaining: author.charsRemaining});
        });
      }
    }

    //testing
    setChars({
      initial: 634,
      remaining: 634
    });

    //if the logged player is not in the room, we should add him/her
    console.log('reloaded');

  }

  const UpdateCharsRemaining = (textLength) => {
    setChars({
      initial: chars.initial,
      remaining: chars.initial - textLength
    })
  }

  useEffect(() => { SetInitialStates() }, [])

  return (
    <View>
      <GameArea readOnly={readOnly} charsRemaining={chars.remaining} updateCharsRemaining={UpdateCharsRemaining} />
      <StoryNav readOnly={readOnly} />
      {/* <RoomMenu/> */}
    </View>
  );
}