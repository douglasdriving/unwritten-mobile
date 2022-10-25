import { ScrollView } from 'react-native';
import { styles } from '../../../style.js';
import { turnWhenCanEnd, maxScenarioCount } from '../../../backend/dataGeneration.js';
import { StoryContent } from './storyArea/storyContent.js';
import { Spacer } from '../../smart/visuals.js';
import { ActionArea } from './actionArea/actionArea.js';

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
          turnNumber={props.turnNumber}
        />
      }
      
      <Spacer />

    </ScrollView>
  );
}