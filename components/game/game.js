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
  const [nextPlayerId, setNextPlayerId] = useState();

  //change during play
  const [chars, setChars] = useState({ initial: 0, remaining: 0 });
  const [timeLeftInTurn, setTimeLeftInTurn] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);

  const LoadRoomData = async () => {

    const room = await GetRoomData(props.route.params.roomId);

    setReadOnly(room.finished);
    setPlayers(room.players);
    setStory({
      title: room.title,
      description: room.description,
      scenarios: room.scenarios
    });

    if (room.finished) return;

    //load chars
    room.players.forEach(player => {
      if (player.id == props.user.id) {
        setChars({
          initial: player.char_count,
          remaining: player.char_count
        })
        // console.log('from room got char coutn: ', player.char_count);
        // console.log('chars was set to: ', chars);
        // console.log('player is: ', player);
      };
    });

    setNextPlayerId(room.next_player_id);

    setTimeLeftInTurn(new Date(room.turn_end).getTime()  - new Date().getTime());
    const interval = setInterval(() => {
      setTimeLeftInTurn(new Date(room.turn_end).getTime()  - new Date().getTime());
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
    if (players.length == 0) return null

    let name = null;

    players.forEach(player => {
      if(player.id == nextPlayerId) name = player.name;
    });

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
        players={players}
      />
      <StoryNav
        readOnly={readOnly}
        openMenu={() => setMenuOpen(true)}
        appNavigation={props.navigation}
      />
      {menuOpen && <RoomMenu
        players={players}
        nextPlayer={nextPlayerId}
        timeLeftInTurn={timeLeftInTurn}
        closeMenu={() => setMenuOpen(false)}
        storyTitle={story.title}
        turnsTaken={story.scenarios.length}
        user={props.user}
        nextPlayerId={nextPlayerId}
      />}
      {scenarioPostLoading && <Popup
        title={'Adding your text'}
        loading={true}
      />}
    </View>
  );
}

