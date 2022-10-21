import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../style.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { useEffect, useState } from 'react';
import { GetRoomData, LogAllRooms, loggedUser, UploadScenario } from '../../backendCalls/backendCalls.js';
import { maxScenarioCount } from '../../backendCalls/dataGeneration.js';
import { GetRandomInt, TimeToHms } from '../../helperFunctions/helpers.js';
import { GenerateRandomPlayer } from '../../backendCalls/dataGeneration.js';
import { Popup } from '../popup.js';

export const Game = (props) => {

  //Load once
  const [readOnly, setReadOnly] = useState("false");
  const [players, setPlayers] = useState([{}]);
  const [story, setStory] = useState({
    title: '',
    description: '',
    scenarios: []
  });
  const [nextPlayer, setNextPlayer] = useState(0); //might be redundant as a state! can be calculated

  //change during play
  const [chars, setChars] = useState({ initial: 0, remaining: 0 });
  const [timeLeftInTurn, setTimeLeftInTurn] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);

  const LoadRoomData = async () => {

    const room = await GetRoomData(props.route.params.roomId);

    const readOnlyValue = room.scenarios.length >= maxScenarioCount;
    setReadOnly(readOnlyValue);

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

    if (readOnlyValue) {
      console.log('is read only');
      return;
    }

    if (playersValue.creator.name == loggedUser.name) setChars({ initial: playersValue.creator.charsRemaining, remaining: playersValue.creator.charsRemaining });
    else if (playersValue.authors) {
      playersValue.authors.forEach(author => {
        if (author.name == loggedUser.name) setChars({ initial: author.charsRemaining, remaining: author.charsRemaining });
      });
    }

    setNextPlayer(room.nextPlayer);

    setTimeLeftInTurn(room.deadline - new Date().getTime());
    const interval = setInterval(() => {
      setTimeLeftInTurn(room.deadline - new Date().getTime());
    }, 1000);

    //testing
    // setChars({
    //   initial: 634,
    //   remaining: 634
    // });

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

    const uploadedScenario = await UploadScenario(text, props.route.params.roomId); //not complete yet. backend call must work to alter DB

    setScenarioPostLoading(false);

    if (uploadedScenario) {
      LoadRoomData();
      return true;
    }
    else return false;

  }
  const GetNextPlayerName = () => {

    if (!players) return null;
    if (!players.creator) return null;
    if (!players.authors) return null;

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
      />}
      {scenarioPostLoading && <Popup
        title={'Adding your text'}
        loading={true}
      />}
    </View>
  );
}

