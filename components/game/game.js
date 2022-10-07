import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';

export const Game = () => {
  return (
    <View style={{flex: 1}}>
      <GameArea></GameArea>
      <StoryNav></StoryNav>
      <RoomMenu/>
    </View>
  );
}