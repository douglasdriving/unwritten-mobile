import { View } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { GetRoomData, UploadScenario } from '../../backend/backendCalls.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea/gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { Popup } from '../smart/popup.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [turnMissed, setTurnMissed] = useState(false);

  //change during play
  const [chars, setChars] = useState({ initial: 0, remaining: 0 });
  const [timeLeftInTurn, setTimeLeftInTurn] = useState(0);
  const [counterUpdateInterval, setCounterUpdateInterval] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scenarioPostLoading, setScenarioPostLoading] = useState(false);

  const GetPlayerStrikes = (players) => {

    //gets the current players strike count
    const player = players.filter(player => player.id == props.user.id)[0];
    const strikes = player.strikes;
    return strikes;

  }

  const CheckForNewStrike = async (players) => {

    //checks to see if the player has gotten a new strike, and shows a popup if they have
    const strikes = GetPlayerStrikes(players);
    const strikeTrackerKey = String(`strikes ${props.route.params.roomId} ${props.user.id}`);
    const seenStrikes = await AsyncStorage.getItem(strikeTrackerKey);
    if (strikes != 0 && parseInt(seenStrikes) < strikes) {
      AsyncStorage.setItem(strikeTrackerKey, String(strikes));
      setTurnMissed(true);
    }

  }

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

    CheckForNewStrike(room.players);

    //load chars
    room.players.forEach(player => {
      if (player.id == props.user.id) {
        setChars({
          initial: player.char_count,
          remaining: player.char_count
        })
      };
    });

    setNextPlayerId(room.next_player_id);

    if (counterUpdateInterval) {
      clearInterval(counterUpdateInterval);
      setCounterUpdateInterval(null);
    }

    setTimeLeftInTurn(new Date(room.turn_end).getTime() - new Date().getTime());
    const interval = setInterval(() => {
      setTimeLeftInTurn(new Date(room.turn_end).getTime() - new Date().getTime());
    }, 1000);
    setCounterUpdateInterval(interval);
  }
  const UpdateCharsRemaining = (textLength) => {
    setChars({
      initial: chars.initial,
      remaining: chars.initial - textLength
    })
  }
  const AddScenario = async text => {

    if (chars.remaining < 0) {
      console.log('could not add scenario because too many chars where used')
      return false;
    }

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
      if (player.id == nextPlayerId) name = player.name;
    });

    return name;
  }

  useFocusEffect(
    useCallback(() => {
      LoadRoomData();
    }, [props.route.params.roomId])
  );

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
      {turnMissed &&
        <Popup
          title={'You missed your turn!'}
          text={`If you miss 3 turns you will be kicked from the room.`}
          onClose={() => { setTurnMissed(false); }}
        />
      }
    </View>
  );
}

