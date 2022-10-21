import { View, Text } from 'react-native';
import { StoryNavButton } from './storyNavButton.js';
import { styles } from '../../../style.js';
import { Popup } from '../../popup.js';
import { useState } from 'react';

export const StoryNav = (props) => {

  const [closePopupOpen, setClosePopupOpen] = useState(false);

  const LeaveRoom = () => {
    ClosePopup();
    props.appNavigation.navigate('Menu');
  }

  const ClosePopup = () => {
    setClosePopupOpen(false);
  }

  return (

    <View style={styles.storyNav}>

      <StoryNavButton type='close' onPress={() => setClosePopupOpen(true)}/>
      {!props.readOnly && <StoryNavButton type='menu' onPress={props.openMenu} />}
      {closePopupOpen && <Popup
        title={'Leave Room?'}
        text={'Leave room and go back to lobby'}
        onClose={ClosePopup}
        loading={false}
        buttons={[
          {
            title: 'Leave',
            handlePress: LeaveRoom
          },
          {
            title: 'Stay',
            handlePress: ClosePopup
          }
        ]}
      />}

    </View>

  );

}