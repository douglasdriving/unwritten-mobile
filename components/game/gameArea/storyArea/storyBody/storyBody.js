
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../../redux/userSlice.js';
import { selectScenarios, selectAllPlayers } from '../../../../../redux/roomSlice.js';
import { Paragraph } from './paragraph.js';
import { useEffect } from 'react';

export const StoryBody = ({ fakeNode }) => {

  const allPlayers = useSelector(selectAllPlayers);
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
      {fakeNode &&
        <Paragraph
          scenario={{
            prompt: fakeNode.prompt,
            scenario: fakeNode.text,
            likes: [],
            node_id: scenarios[scenarios.length - 1].node_id + 1,
          }}
          scenarioNumber={scenarios.length + 1}
          key={scenarios.length + 1}
          isUser={true}
          authorName={fakeNode.name}
        />}
    </>
  );
}

