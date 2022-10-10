import { View, Text} from 'react-native';
import { StoryNavButton } from './storyNavButton.js';
import { styles } from '../../../style.js';

export const StoryNav = (props) => {

  const readOnly = props.readOnly;

  return (
    <View style={styles.storyNav}>
      <StoryNavButton type='close'/>
      {!readOnly && <StoryNavButton type='menu'/>}
    </View>
  );
}