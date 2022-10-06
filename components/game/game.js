import { View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav.js';

export const Game = () => {
  return (
    <View style={styles.container}>
      <StoryNav></StoryNav>
    </View>
  );
}