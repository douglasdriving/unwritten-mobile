import { View } from 'react-native';
import { styles } from '../../../style.js';
import { useState } from 'react';
import { StoryNavButton } from './storyNavButton.js';
import { Popup } from '../../smart/popup.js';
import { navigate } from '../../../contexts/rootNavigation.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectReadOnly, resetRoom } from '../../../redux/roomSlice.js';

export const StoryNav = (props) => {

  const [closePopupOpen, setClosePopupOpen] = useState(false);
  const readOnly = useSelector(selectReadOnly);
  const dispatch = useDispatch();

  const LeaveRoom = () => {
    dispatch(resetRoom());
    ClosePopup();
    navigate('Menu');
  }

  const ClosePopup = () => {
    setClosePopupOpen(false);
  }

  return (

    <View style={styles.storyNav}>

      <StoryNavButton type='close' onPress={() => setClosePopupOpen(true)} />

      {!readOnly && <StoryNavButton type='menu' onPress={props.openMenu} />}

      {closePopupOpen && <Popup
        title={'Leave Room?'}
        text={'Leave room and go back to lobby'}
        onClose={ClosePopup}
        loading={false}
        buttons={[
          {
            title: 'Leave',
            handlePress: LeaveRoom
          }
        ]}
      />}

    </View>

  );

}