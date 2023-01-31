import { View, ImageBackground } from 'react-native';
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
import { GameTutorial } from './tutorial/gameTutorial.js';
import background from '../../assets/background/campfireBackgroundBlurred.png';

export const Game = () => {

  //global redux
  const user = useSelector(selectUser);
  const readOnly = useSelector(selectReadOnly);
  const players = useSelector(selectAllPlayers);
  const roomId = useSelector(selectRoomId);

  //Load once
  const [turnMissed, setTurnMissed] = useState(false);

  //change during play
  const [menuOpen, setMenuOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(true);

  const CheckForNewStrike = async () => {

    //checks to see if the player has gotten a new strike, and shows a popup if they have
    if (readOnly) return;
    if (!players) return;

    const player = players.filter(player => player.id == user.id)[0];

    let strikes = 0
    if (!player || (!player.strikes && player.strikes != 0)) {
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
  const CheckIfTutorialShouldBeHidden = async () => {

    //turn of is player is just spectating
    let playerIsInRoom = false;
    players.forEach(player => {
      if (player.id == user.id) playerIsInRoom = true;
    });
    if (!playerIsInRoom) {
      setTutorialOpen(false);
      return;
    }

    //turn off is player has checked the box before
    const savedState = await AsyncStorage.getItem('hideCampTutorial');
    if (savedState == 'hide') setTutorialOpen(false);
    else if (savedState == 'show') setTutorialOpen(true);
    else setTutorialOpen(true);

  }

  useFocusEffect(
    useCallback(() => {
      CheckForNewStrike();
      CheckIfTutorialShouldBeHidden();
    }, [])
  );

  return (
    <View style={{ height: '100%' }}>

      {tutorialOpen && <GameTutorial close={() => setTutorialOpen(false)} />}
      <GameArea />
      <StoryNav openMenu={() => setMenuOpen(true)} />
      {menuOpen && <RoomMenu
        closeMenu={() => setMenuOpen(false)}
        openTutorial={() => setTutorialOpen(true)}
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

