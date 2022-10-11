import { ScrollView, Text } from 'react-native';
import { styles } from '../../style.js';
import { StoryContent } from './storyArea/storyContent.js';
import { Spacer } from '../visuals.js';
import { ActionArea } from './actionArea/actionArea.js';

export const GameArea = (props) => {

  const readOnly = props.readOnly;

  return (
    <ScrollView style={styles.gameWindow}>
      <StoryContent readOnly={readOnly}/>
      {!readOnly && <ActionArea/>}
      <Spacer/>
    </ScrollView>
  );
}