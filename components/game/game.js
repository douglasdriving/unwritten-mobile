import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea/gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import { Popup } from '../smart/popup.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice.js';
import { selectAllPlayers, selectReadOnly, selectRoomId } from '../../redux/roomSlice.js';
import { colors } from '../../style.js';

export const Game = (props) => {

  //global redux
  const user = useSelector(selectUser);
  const readOnly = useSelector(selectReadOnly);
  const players = useSelector(selectAllPlayers);
  const roomId = useSelector(selectRoomId);

  //Load once
  const [turnMissed, setTurnMissed] = useState(false);

  //change during play
  const [menuOpen, setMenuOpen] = useState(false);

  const CheckForNewStrike = async () => {

    //checks to see if the player has gotten a new strike, and shows a popup if they have
    if (readOnly) return;
    if (!players) return;

    const player = players.filter(player => player.id == user.id)[0];

    let strikes = 0
    if (!player || (!player.strikes && player.strikes != 0)) {
      console.error('could not identify the logged player to get strikes. setting it to 0');
      strikes = 0;
    }
    else {
      strikes = player.strikes;
    }

    const strikeTrackerKey = String(`strikes ${roomId} ${user.id}`);
    const seenStrikes = await AsyncStorage.getItem(strikeTrackerKey);

    if (strikes != 0 && parseInt(seenStrikes) < strikes) {
      AsyncStorage.setItem(strikeTrackerKey, String(strikes));
      setTurnMissed(true);
    }

  }

  useFocusEffect(
    useCallback(() => {
      CheckForNewStrike();
    }, [])
  );

  return (
    <View style={{ backgroundColor: colors.fire, height: '100%' }}>
      <GameArea />
      <StoryNav
        openMenu={() => setMenuOpen(true)}
      />
      {menuOpen && <RoomMenu
        closeMenu={() => setMenuOpen(false)}
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

