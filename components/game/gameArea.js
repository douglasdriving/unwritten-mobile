import { ScrollView, Text } from 'react-native';
import { styles } from '../../style.js';
import { StoryContent } from './storyArea/storyContent.js';
import { Spacer } from '../visuals.js';
import { ActionArea } from './actionArea/actionArea.js';

export const GameArea = (props) => {

  return (
    <ScrollView style={styles.gameWindow}>
      <StoryContent readOnly={props.readOnly} story={props.story} />
      {!props.readOnly &&
        <ActionArea
          charsRemaining={props.charsRemaining}
          updateCharsRemaining={props.updateCharsRemaining}
          AddScenario={props.AddScenario}
          nextPlayerName={props.nextPlayerName}
        />
      }
      <Spacer />
    </ScrollView>
  );
}