import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { useEffect, useState } from 'react';
import { GetRoomData, LogAllRooms } from '../../backendCalls/backendCalls.js';
import { maxScenarioCount } from '../../backendCalls/dataGeneration.js';

export const Game = (props) => {

  //yes if its full & I am not in it, or if all scenarios are full
  const [readOnly, setReadOnly] = useState("false");

  const SetInitialStates = async () => {

    const room = await GetRoomData(props.route.params.roomId);
    setReadOnly(room.scenarios.length >= maxScenarioCount);

  }

  useEffect(() => {SetInitialStates()}, [])

  return (
    <View>
      <GameArea readOnly={props.readOnly} />
      <StoryNav readOnly={props.readOnly} />
      <Text>read only is: {readOnly}</Text>
      {/* <RoomMenu/> */}
    </View>
  );
}