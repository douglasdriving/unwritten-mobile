import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StoryNav } from './storyNav/storyNav.js';
import { GameArea } from './gameArea/gameArea.js';
import { RoomMenu } from './roomMenu/roomMenu.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameTutorial } from './tutorial/gameTutorial.js';

export const Game = () => {

  //change during play
  const [menuOpen, setMenuOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(true);

  const CheckIfTutorialShouldBeHidden = async () => {

    //turn off is player has checked the box before
    const savedState = await AsyncStorage.getItem('hideCampTutorial');
    if (savedState == 'hide') setTutorialOpen(false);
    else if (savedState == 'show') setTutorialOpen(true);
    else setTutorialOpen(true);

  }

  useFocusEffect(
    useCallback(() => {
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

    </View>
  );
}

