import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';

export const Game = (props) => {
  return (
    <View>
      <GameArea readOnly={props.readOnly}/>
      <StoryNav readOnly={props.readOnly}/>
      {/* <RoomMenu/> */}
    </View>
  );
}