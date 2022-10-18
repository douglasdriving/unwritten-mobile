import { View, Text} from 'react-native';
import { StoryNavButton } from './storyNavButton.js';
import { styles } from '../../../style.js';

export const StoryNav = (props) => {

  return (
    <View style={styles.storyNav}>
      <StoryNavButton type='close'/>
      {!props.readOnly && <StoryNavButton type='menu'/>}
    </View>
  );
}