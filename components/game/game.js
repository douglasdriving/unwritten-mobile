import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav.js';
import { GameArea } from './gameArea.js';

export const Game = () => {
  return (
    <View style={{flex: 1}}>
      <GameArea></GameArea>
      <StoryNav></StoryNav>
    </View>
  );
}