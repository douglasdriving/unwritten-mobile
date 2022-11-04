import { Text, ScrollView } from 'react-native';
import { styles } from '../../../style';
import { GetAvailableRooms } from '../../../backend/backendCalls';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StoryList } from '../modularComponents/storyList/storylist';
import { Popup } from '../../smart/popup';
import { MenuScreenHeader } from '../modularComponents/menuScreenHeader';

export const JoinRoom = (props) => {

  const [availableRoomsList, setAvailableRoomsList] = useState();
  const [welcomPopup, setWelcomePopup] = useState(props.user.new);

  const Load = async () => {
    const rooms = await GetAvailableRooms();

    const newRoomsList = rooms.new.map(room => {
      return {
        title: room.title,
        description: room.description,
        creator: room.creator,
        roomId: room.id,
        buttonText: 'Join ->'
      }
    });

    const ongoingRoomsList = rooms.ongoing.map(room => {
      return {
        title: room.title,
        description: room.description,
        creator: room.creator,
        authorCount: room.authors.length + 1,
        turn: room.scenarios.length,
        roomId: room.id,
        buttonText: 'Join ->'
      }
    });

    const newList = {
      new: newRoomsList,
      ongoing: ongoingRoomsList
    };;

    setAvailableRoomsList(newList);
  }

  useFocusEffect(
    useCallback(() => {
      Load();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <MenuScreenHeader {...props}/>

      {welcomPopup &&
        <Popup
          title='Welcome to Unwritten!'
          text='As a free user, you can join 2 rooms to write stories,
          and access the library of finished stories. Start by joining a room!
          If you want to play unlimited stories and create your own,
          consider joining Unwritten'
          onClose={() => { setWelcomePopup(false) }}
          buttons={[
            {
              title: 'Join Unwritten',
              handlePress: () => { props.appNavigation.navigate('Join') }
            },
          ]}
        />
      }

      <Text style={styles.h1}>Join a Room</Text>
      <Text style={styles.h2}>New Rooms</Text>
      <Text style={styles.body}>Join a newly created room and take part in writing a story from the beginning!</Text>

      {(availableRoomsList && availableRoomsList.new) &&
        <StoryList
          listItemInfo={availableRoomsList.new}
          {...props}
          confirmJoin={true}
        />
      }

      <Text style={styles.h2}>Looking for people</Text>
      <Text style={styles.body}>Rooms with ongoing story that has one or more spots open to fill</Text>

      {(availableRoomsList && availableRoomsList.ongoing) &&
        <StoryList
          listItemInfo={availableRoomsList.ongoing}
          {...props}
          confirmJoin={true}
        />
      }

    </ScrollView>
  );
}