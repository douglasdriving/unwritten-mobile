import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { useEffect, useState } from 'react';
import { GetRoomData, LogAllRooms, loggedUser } from '../../backendCalls/backendCalls.js';
import { maxScenarioCount } from '../../backendCalls/dataGeneration.js';

export const Game = (props) => {

  const [readOnly, setReadOnly] = useState("false");
  const [players, setPlayers] = useState([]);

  const SetInitialStates = async () => {

    const room = await GetRoomData(props.route.params.roomId);

    setReadOnly(room.scenarios.length >= maxScenarioCount);
    setPlayers({
      creator: room.creator,
      authors: room.authors
    });

  }

  useEffect(() => {SetInitialStates()}, [])

  return (
    <View>
      <GameArea readOnly={readOnly} />
      <StoryNav readOnly={readOnly} />
      {/* <RoomMenu/> */}
    </View>
  );
}