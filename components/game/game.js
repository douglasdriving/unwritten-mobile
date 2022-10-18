import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { useEffect } from 'react';

export const Game = (props) => {

  useEffect(() => {
    console.log('entered room with props: ', props.route.params.roomId);
  })

  return (
    <View>
      <GameArea readOnly={props.readOnly}/>
      <StoryNav readOnly={props.readOnly}/>
      <Text>Entered room with id {props.route.params.roomId}</Text>
      {/* <RoomMenu/> */}
    </View>
  );
}