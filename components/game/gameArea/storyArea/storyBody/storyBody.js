
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../../redux/userSlice.js';
import { selectScenarios } from '../../../../../redux/roomSlice.js';
import { Paragraph } from '../paragraph.js';

export const StoryBody = (props) => {

  const allPlayers = props.allPlayers; //could also be in redux.
  const userId = useSelector(selectUserId);
  const scenarios = useSelector(selectScenarios);

  const GetPlayerName = (id) => {

    if (!allPlayers || allPlayers.length < 1) return '';

    const filtered = allPlayers.filter(player => player.id == id);
    const player = filtered[0];

    if (!player) return '';
    const name = player.name;
    return name;

  }

  return (
    <>
      {scenarios.map((scenario, i) =>
        <Paragraph
          scenario={scenario}
          scenarioNumber={i + 1}
          key={i}
          isUser={userId == scenario.creator_id}
          authorName={GetPlayerName(scenario.creator_id)}
        />
      )}
    </>
  );
}

