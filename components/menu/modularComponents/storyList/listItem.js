import { Button, Text, View, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../../../../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { Popup } from '../../../smart/popup';
import { JoinRoom } from '../../../../backend/backendCalls';

export const ListItem = (props) => {

  const [open, setOpen] = useState(false);
  const [joinConfirmPopup, setJoinConfirmPopup] = useState(false);
  const [roomLoading, setRoomLoading] = useState(false);

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

  const EnterRoom = () => {
    props.navigation.navigate('Game', { roomId: roomId });
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
    if (authors) texts.push(GenerateAuthorText());
    if (authorCount) texts.push(`${authorCount}/4 players`);
    if (turn) texts.push(`🎲 Turn ${turn}`);

    return texts;

  }

  const HandleJoinButtonPress = () => {
    if (props.confirmJoin) setJoinConfirmPopup(true);
    else EnterRoom();
  }

  const HandleConfirmButtonPress = async () => {
    setJoinConfirmPopup(false);
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

  return (
    <View>

      {joinConfirmPopup &&
        <Popup
          title={'Join the room to write "' + title + '"?'}
          text='Once you join this room, you will be expected to write the next part of the story.'
          onClose={() => { setJoinConfirmPopup(false) }}
          buttons={[
            {
              title: 'Join Room',
              handlePress: HandleConfirmButtonPress
            },
            {
              title: 'Cancel',
              handlePress: () => { setJoinConfirmPopup(false) }
            }
          ]}
        />
      }

      {roomLoading &&
        <Popup
          title='Joining Room...'
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
          backgroundColor: 'white',
          width: '100%',
          marginTop: 5,
          padding: 10
        }} >

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            {title && <Text style={styles.h3}>
              {title}
              {alert && '❗'}
            </Text>}
            {playersTurn && alert}
            {/* <Icon name={open ? "arrow-up" : "arrow-down"} size={20} /> */}
          </View>

        </View>
      </TouchableWithoutFeedback >
    </View>


  );
}