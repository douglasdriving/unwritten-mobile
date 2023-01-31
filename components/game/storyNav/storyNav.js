import { View, StatusBar } from 'react-native';
import { styles, colors2 } from '../../../style.js';
import { useState } from 'react';
import { StoryNavButton } from './storyNavButton.js';
import { Popup } from '../../smart/popup.js';
import { navigate } from '../../../contexts/rootNavigation.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectReadOnly, resetRoom, selectScenarioCount } from '../../../redux/roomSlice.js';
import { ProgressBar } from '../../smart/progressBar.js';

export const StoryNav = (props) => {

  const [closePopupOpen, setClosePopupOpen] = useState(false);
  const scenarioCount = useSelector(selectScenarioCount);
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

      <StatusBar barStyle={colors2.red} backgroundColor={colors2.night}/>

      <StoryNavButton type='close' onPress={() => setClosePopupOpen(true)} />

      <ProgressBar width='60%' percent={scenarioCount/40 * 100} label={`🎲 ${scenarioCount}/40`}/> 

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