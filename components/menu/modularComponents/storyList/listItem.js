import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { colors2, styles } from '../../../../style';
import { useState } from 'react';
import { Popup } from '../../../smart/popup';
import { JoinRoom } from '../../../../backend/backendCalls';
import { navigateToRoom } from '../../../../contexts/rootNavigation';
import { useDispatch } from 'react-redux';
import { loadRoomData } from '../../../../redux/roomSlice';

export const ListItem = (props) => {

  const [open, setOpen] = useState(false);
  const [roomLoading, setRoomLoading] = useState(false);
  const dispatch = useDispatch();
  const {confirmJoin} = props;

  const {
    title,
    alert,
    description,
    playersTurn,
    creator,
    authors,
    authorCount,
    turn,
    buttonText,
    roomId
  } = props.listItemInfo;

  const Toggle = () => {
    setOpen(!open);
    return;
  }

  const EnterRoom = async () => {
    setOpen(false);
    await dispatch(loadRoomData({id: roomId}));
    navigateToRoom(roomId);
  }

  const GeneratePopupText = () => {

    const GenerateAuthorText = () => {

      if (!authors || authors.length == 0) return null;

      let authorText = null;
      authorText = 'Authors:'
      authors.forEach((author, i) => {
        const last = (i >= authors.length - 1);
        if (last) authorText += ' and ';
        else authorText += ' ';
        authorText += author;
        if (i < authors.length - 1 && authors.length > 2) authorText += ',';
      });

      return authorText;

    }

    const texts = [];

    if (description) texts.push(description);
    if (creator) texts.push(`Creator: ${creator}`);
    if (authors && authors.length > 0) texts.push(GenerateAuthorText());
    if (authors && authors.length > 0) texts.push(`${authors.length + 1}/4 players`);
    if (turn) texts.push(`🎲 Turn ${turn}`);
    if (confirmJoin) {
      texts.push(`---`);
      texts.push(`Do you want to join this camp? You will be expected to continue the story`);
    }

    return texts;

  }

  const HandleJoinButtonPress = async () => {

    if (confirmJoin) {
      console.log('joining room');
      setRoomLoading(true);
      const success = await JoinRoom(roomId);
      setRoomLoading(false);
      if (success) {
        EnterRoom();
      }
      else {
        console.error('FAILED TO JOIN ROOM. backend returned false');
      }
    }
    else {
      EnterRoom();
    }
  }

  return (
    <View>

      {roomLoading &&
        <Popup
          title='Joining Camp...'
          loading={true}
        />
      }

      {open &&
        <Popup
          title={title}
          onClose={() => setOpen(false)}
          text={GeneratePopupText()}
          buttons={buttonText &&
            [{
              title: buttonText,
              handlePress: HandleJoinButtonPress
            }]}
        />
      }

      <TouchableWithoutFeedback onPress={Toggle}>
        <View style={{
          backgroundColor: colors2.wood,
          width: '100%',
          marginTop: 5,
          padding: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 10,
        }} >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            {title && <Text style={[styles.h3, { color: colors2.light }]} numberOfLines={1}>
              {title}
              {alert && '❗'}
            </Text>}
            {playersTurn && alert}
          </View>

        </View>
      </TouchableWithoutFeedback >
    </View>


  );
}