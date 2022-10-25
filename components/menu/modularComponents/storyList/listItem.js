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

  const Toggle = () => {
    setOpen(!open);
    return;
  }

  const EnterRoom = () => {
    props.navigation.navigate('Game', { roomId: props.listItemInfo.roomId });
  }

  const GenerateAuthorText = () => {

    const authors = props.listItemInfo.authors;
    if (!authors || authors.length == 0) return null;

    let authorText = null;
    authorText = 'Authors:'
    props.listItemInfo.authors.forEach(author => {
      authorText += ' ' + author.name + ','
    });

    return authorText;

  }

  const HandleJoinButtonPress = () => {
    if (props.confirmJoin) setJoinConfirmPopup(true);
    else EnterRoom();
  }

  const HandleConfirmButtonPress = async () => {
    setJoinConfirmPopup(false);
    setRoomLoading(true);
    const success = await JoinRoom(props.listItemInfo.roomId);
    setRoomLoading(false);
    if (success){
      EnterRoom();
    }
    else{
      console.error('FAILED TO JOIN ROOM. backend returned false');
    }
  }

  return (
    <View>

      {joinConfirmPopup &&
        <Popup
          title={'Join the room to write "' + props.listItemInfo.title + '"?'}
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
            {props.listItemInfo.title && <Text style={styles.h3}>
              {props.listItemInfo.title}
              {props.listItemInfo.alert && '❗'}
            </Text>}
            {props.listItemInfo.playersTurn && props.listItemInfo.alert}
            <Icon name={open ? "arrow-up" : "arrow-down"} size={20} />
          </View>

          {open &&
            (
              <View>
                {props.listItemInfo.description && <Text>{props.listItemInfo.description}</Text>}
                {props.listItemInfo.creator && <Text>Creator: {props.listItemInfo.creator.name}</Text>}
                {(GenerateAuthorText() != null) && <Text>{GenerateAuthorText()}</Text>}
                {props.listItemInfo.authorCount && <Text>🧔 {props.listItemInfo.authorCount}/4 writers</Text>}
                {props.listItemInfo.turn && <Text>🎲 Turn {props.listItemInfo.turn}/40</Text>}
                {props.listItemInfo.buttonText && <Button title={props.listItemInfo.buttonText} onPress={HandleJoinButtonPress} />}
              </View>
            )
          }

        </View>
      </TouchableWithoutFeedback >
    </View>


  );
}