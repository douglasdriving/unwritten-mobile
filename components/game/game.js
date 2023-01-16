import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { GetRoomData } from '../../backend/backendCalls.js';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea/gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { Popup } from '../smart/popup.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice.js';
import { selectTurnDeadline, setTurnDeadline } from '../../redux/roomSlice.js';
import { Space } from '../smart/visuals.js';
import { colors } from '../../style.js';

export const Game = (props) => {

  //global redux
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const turnDeadline = useSelector(selectTurnDeadline);

  //Load once
  const [readOnly, setReadOnly] = useState("false");
  const [activePlayers, setActivePlayers] = useState([]);
  const [inActivePlayers, setInactivePlayers] = useState([]);
  const [story, setStory] = useState({
    title: '',
    description: '',
    scenarios: []
  });
  const [nextPlayerId, setNextPlayerId] = useState();
  const [turnMissed, setTurnMissed] = useState(false);

  //change during play
  // const [timeLeftInTurn, setTimeLeftInTurn] = useState(0);
  const [counterUpdateInterval, setCounterUpdateInterval] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const GetPlayerStrikes = (players) => {

    //gets the current players strike count
    const player = players.filter(player => player.id == user.id)[0];
    if (!player || !player.strikes) {
      console.error('could not identify the logged player to get strikes');
      return 0;
    }
    const strikes = player.strikes;
    return strikes;

  }
  const CheckForNewStrike = async (players) => {

    //checks to see if the player has gotten a new strike, and shows a popup if they have
    const strikes = GetPlayerStrikes(players);
    const strikeTrackerKey = String(`strikes ${props.route.params.roomId} ${user.id}`);
    const seenStrikes = await AsyncStorage.getItem(strikeTrackerKey);
    if (strikes != 0 && parseInt(seenStrikes) < strikes) {
      AsyncStorage.setItem(strikeTrackerKey, String(strikes));
      setTurnMissed(true);
    }

  }
  const LoadRoomData = async () => {

    const room = await GetRoomData(props.route.params.roomId);

    if (!room) {
      console.error('Failed to get the room data from the backend!');
      return;
    }

    setReadOnly(room.finished);
    setActivePlayers(room.players.filter(player => player.active));
    setInactivePlayers(room.players.filter(player => !player.active));
    setStory({
      title: room.title,
      description: room.description,
      scenarios: room.scenarios
    });

    if (room.finished) return;

    CheckForNewStrike(room.players);
    setNextPlayerId(room.next_player_id);

    if (counterUpdateInterval) {
      clearInterval(counterUpdateInterval);
      setCounterUpdateInterval(null);
    }

    //const timeLeft = new Date(room.turn_end).getTime() - new Date().getTime();
    dispatch(setTurnDeadline(room.turn_end));

    // setTimeLeftInTurn(new Date(room.turn_end).getTime() - new Date().getTime());

    //make time left tick down
    //++ improvement is to move this logic into the room slice! it should always tick down
    // const interval = setInterval(() => {
    //   const newTimeLeft = new Date(room.turn_end).getTime() - new Date().getTime();
    //   dispatch(setTimeLeftInTurn(newTimeLeft));
    // }, 1000);
    // setCounterUpdateInterval(interval);

  }

  const GetNextPlayerName = () => {

    if (!activePlayers) return null;
    if (activePlayers.length == 0) return null

    let name = null;

    activePlayers.forEach(player => {
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
    <View style={{ backgroundColor: colors.fire, height: '100%' }}>
      <GameArea
        readOnly={readOnly}
        story={story}
        nextPlayerName={GetNextPlayerName()}
        // timeLeftInTurn={timeLeftInTurn}
        turnNumber={story.scenarios.length + 1}
        players={activePlayers}
        inActivePlayers={inActivePlayers}
        roomId={props.route.params.roomId}
        LoadRoomData={LoadRoomData}
      />
      <StoryNav
        readOnly={readOnly}
        openMenu={() => setMenuOpen(true)}
      />
      {menuOpen && <RoomMenu
        players={activePlayers}
        nextPlayer={nextPlayerId}
        // timeLeftInTurn={timeLeftInTurn}
        closeMenu={() => setMenuOpen(false)}
        storyTitle={story.title}
        turnsTaken={story.scenarios.length}
        nextPlayerId={nextPlayerId}
        roomId={props.route.params.roomId}
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

