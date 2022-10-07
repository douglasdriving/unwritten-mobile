import { ScrollView, Text } from 'react-native';
import { styles } from '../../style.js';
import { StoryContent } from './storyContent.js';

export const GameArea = () => {
  return (
    <ScrollView style={styles.gameWindow}>
      <StoryContent/>
    </ScrollView>
  );
}