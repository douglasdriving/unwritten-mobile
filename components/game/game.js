import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { GetRoomData, UploadScenario } from '../../backend/backendCalls.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea/gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { Popup } from '../smart/popup.js';

export const Game = (props) => {

  //Load once
  const [readOnly, setReadOnly] = useState("false");
  const [players, setPlayers] = useState([{}]);
  const [story, setStory] = useState({
    title: '',
    description: '',
    scenarios: []
  });
  const [nextPlayer, setNextPlayer] = useState();

  //change during play
  const [chars, setChars] = useState({ initial: 0, remaining: 0 });
  const [timeLeftInTurn, setTimeLeftInTurn] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);

  const LoadRoomData = async () => {

    const room = await GetRoomData(props.route.params.roomId);

    setReadOnly(room.finished);

    const playersValue = {
      creator: room.creator,
      authors: room.authors
    };
    setPlayers(playersValue);

    setStory({
      title: room.title,
      description: room.description,
      scenarios: room.scenarios
    });

    if (room.finished) {
      return;
    }

    if (playersValue.creator.name == props.user.name) setChars({ initial: playersValue.creator.charsRemaining, remaining: playersValue.creator.charsRemaining });
    else if (playersValue.authors) {
      playersValue.authors.forEach(author => {
        if (author.name == props.user.name) setChars({ initial: author.charsRemaining, remaining: author.charsRemaining });
      });
    }

    setNextPlayer(room.nextPlayer);

    setTimeLeftInTurn(room.deadline - new Date().getTime());
    const interval = setInterval(() => {
      setTimeLeftInTurn(room.deadline - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }
  const UpdateCharsRemaining = (textLength) => {
    setChars({
      initial: chars.initial,
      remaining: chars.initial - textLength
    })
  }
  const AddScenario = async text => {

    if (chars.remaining < 0) return false;

    setScenarioPostLoading(true);

    const uploadedScenario = await UploadScenario(text, props.route.params.roomId);

    if (uploadedScenario) {
      await LoadRoomData();
      setScenarioPostLoading(false);
      return true;
    }
    else {
      console.error('was not able to add the scenario');
      setScenarioPostLoading(false);
      return false;
    }

  }
  const GetNextPlayerName = () => {

    if (!players) return null;
    if (!players.creator) return null;
    if (!players.authors) return null;
    if (players.authors.length == 0) return null

    let name = null;

    if (nextPlayer == 0) name = players.creator.name;
    else if (players.authors.length >= nextPlayer) {
      name = players.authors[nextPlayer - 1].name;
    }
    return name;
  }

  useEffect(() => { LoadRoomData() }, [])

  return (
    <View>
      <GameArea
        readOnly={readOnly}
        charsRemaining={chars.remaining}
        updateCharsRemaining={UpdateCharsRemaining}
        story={story}
        AddScenario={AddScenario}
        nextPlayerName={GetNextPlayerName()}
        timeLeftInTurn={timeLeftInTurn}
        user={props.user}
        turnNumber={story.scenarios.length + 1}
      />
      <StoryNav
        readOnly={readOnly}
        openMenu={() => setMenuOpen(true)}
        appNavigation={props.navigation}
      />
      {menuOpen && <RoomMenu
        players={players}
        nextPlayer={nextPlayer}
        timeLeftInTurn={timeLeftInTurn}
        closeMenu={() => setMenuOpen(false)}
        storyTitle={story.title}
        turnsTaken={story.scenarios.length}
        user={props.user}
      />}
      {scenarioPostLoading && <Popup
        title={'Adding your text'}
        loading={true}
      />}
    </View>
  );
}

