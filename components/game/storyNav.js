import { View, Text} from 'react-native';
import { StoryNavButton } from './storyNavButton.js';
import { styles } from '../../style.js';

export const StoryNav = () => {
  return (
    <View style={styles.storyNav}>
      <StoryNavButton type='close'/>
      <StoryNavButton type='menu'/>
    </View>
  );
}