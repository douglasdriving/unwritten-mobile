import { ScrollView, Text } from 'react-native';
import { styles } from '../../style.js';
import { StoryContent } from './storyArea/storyContent.js';
import { Spacer } from '../visuals.js';
import { ActionArea } from './actionArea/actionArea.js';
import { turnWhenCanEnd, maxScenarioCount } from '../../backendCalls/dataGeneration.js';

export const GameArea = (props) => {

  return (
    <ScrollView style={styles.gameWindow}>

      <StoryContent
        readOnly={props.readOnly}
        story={props.story}
        user={props.user}
      />

      {!props.readOnly &&
        <ActionArea
          charsRemaining={props.charsRemaining}
          updateCharsRemaining={props.updateCharsRemaining}
          AddScenario={props.AddScenario}
          nextPlayerName={props.nextPlayerName}
          timeLeftInTurn={props.timeLeftInTurn}
          turnsUntilCanEnd={turnWhenCanEnd - props.story.scenarios.length}
          turnsUntilMustEnd={maxScenarioCount - props.story.scenarios.length}
          user={props.user}
        />
      }
      
      <Spacer />

    </ScrollView>
  );
}