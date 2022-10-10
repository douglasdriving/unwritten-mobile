import { ScrollView, Text } from 'react-native';
import { styles } from '../../style.js';
import { StoryContent } from './storyArea/storyContent.js';
import { YourTurnField } from './actionArea/yourTurnField/yourTurnField.js';
import { WritingField } from './actionArea/writingField/writingField.js';
import { PlayerSearchField } from './actionArea/playerSearchField/playerSearchField.js';
import { WaitingField } from './actionArea/waitingField/waitingField.js';
import { Spacer } from '../visuals.js';

export const GameArea = (props) => {

  const readOnly = props.readOnly;

  return (
    <ScrollView style={styles.gameWindow}>
      <StoryContent readOnly={readOnly}/>
      {!readOnly && <WaitingField/>}
      <Spacer/>
    </ScrollView>
  );
}