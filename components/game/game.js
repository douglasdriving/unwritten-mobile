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
import { setReadOnlyOn, setReadOnlyOff, setStoryContent, setPlayers, setNextPlayerId } from '../../redux/roomSlice.js';
import { colors } from '../../style.js';

export const Game = (props) => {

  //global redux
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //Load once
  const [turnMissed, setTurnMissed] = useState(false);

  //change during play
  const [menuOpen, setMenuOpen] = useState(false);

  const GetPlayerStrikes = (players) => {

    //gets the current players strike count
    const player = players.filter(player => player.id == user.id)[0];

    if (!player || (!player.strikes && player.strikes != 0)) {
      console.error('could not identify the logged player to get strikes. setting it to 0');
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

    if (room.finished) dispatch(setReadOnlyOn());
    else dispatch(setReadOnlyOff());

    dispatch(setPlayers(room.players));

    dispatch(setStoryContent({
      title: room.title,
      description: room.description,
      scenarios: room.scenarios
    }));

    if (room.finished) return;

    CheckForNewStrike(room.players);
    dispatch(setNextPlayerId(room.next_player_id));
  }

  useFocusEffect(
    useCallback(() => {
      LoadRoomData();
    }, [props.route.params.roomId])
  );

  return (
    <View style={{ backgroundColor: colors.fire, height: '100%' }}>
      <GameArea
        roomId={props.route.params.roomId}
        LoadRoomData={LoadRoomData}
      />
      <StoryNav
        openMenu={() => setMenuOpen(true)}
      />
      {menuOpen && <RoomMenu
        closeMenu={() => setMenuOpen(false)}
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

