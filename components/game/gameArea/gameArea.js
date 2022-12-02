import { ScrollView } from 'react-native';
import { styles } from '../../../style.js';
import { StoryContent } from './storyArea/storyContent.js';
import { Space } from '../../smart/visuals.js';
import { ActionArea } from './actionArea/actionArea.js';

export const GameArea = (props) => {

  return (
    <ScrollView style={styles.gameWindow}>
      <StoryContent {...props} />
      {!props.readOnly && <ActionArea {...props} />}
      {Space(200)}
    </ScrollView>
  );
}