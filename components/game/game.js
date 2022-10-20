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

export const Game = (props) => {

  const [readOnly, setReadOnly] = useState("false");
  const [players, setPlayers] = useState({});
  const [chars, setChars] = useState({ initial: 0, remaining: 0 });
  const [story, setStory] = useState({
    title: '',
    description: '',
    scenarios: []
  });
  const [nextPlayer, setNextPlayer] = useState({}); //might be redundant as a state! can be calculated
  const [timeLeftInTurn, setTimeLeftInTurn] = useState(0);

  const SetInitialStates = async () => {

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

    if (readOnlyValue){
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
  const AddScenario = async text => { //not complete yet. backend call must work to alter DB
    if (chars.remaining < 0) return false;
    console.log('not too long');
    const uploadedScenario = await UploadScenario(text);
    if (uploadedScenario) {
      console.log('upload was successful');
      setStory({
        title: story.title,
        description: story.description,
        scenarios: [...story.scenarios, uploadedScenario]
      });
      console.log('added the scenario: ', uploadedScenario);
      return true;
    } //alternatively, we could just reload the game from scratch with the db data. Would be an extra call, but perhaps less code
    else return false;
  }
  const GetNextPlayerName = () => {

    if (!players) return null;
    if (!players.creator) return null;
    if (!players.authors) return null;


    if (nextPlayer == 0) return players.creator.name;
    else if (players.authors.length >= nextPlayer) {
      return (players.authors[nextPlayer - 1].name)
    }
    else return null;
  }

  useEffect(() => { SetInitialStates() }, [])

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
      <StoryNav readOnly={readOnly} />
      <RoomMenu
        players={players}
        nextPlayer={nextPlayer}
        timeLeftInTurn={timeLeftInTurn}
      />
    </View>
  );
}

