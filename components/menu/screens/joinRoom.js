import { Text, ScrollView } from 'react-native';
import { colors, styles } from '../../../style';
import { GetAvailableRooms } from '../../../backend/backendCalls';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StoryList } from '../modularComponents/storyList/storylist';
import { Popup } from '../../smart/popup';
import { navigate } from '../../../contexts/rootNavigation';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/userSlice';

export const JoinRoom = (props) => {

  const [availableRoomsList, setAvailableRoomsList] = useState();
  const [welcomPopup, setWelcomePopup] = useState();
  const user = useSelector(selectUser);

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
        authorCount: Math.min(room.writers.length + 1, 3),
        turn: room.scenario_count,
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

  useEffect(() => {
    if (!user) console.error('no user found in the redux store');
  })

  useFocusEffect(
    useCallback(() => {
      Load();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
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
              handlePress: () => { navigate('Join') }
            },
          ]}
        />
      }

      <Text style={styles.h1}>Rooms</Text>

      {(availableRoomsList && availableRoomsList.new && availableRoomsList.ongoing && availableRoomsList.new.length == 0 && availableRoomsList.ongoing.length == 0) &&
        <Text style={[styles.paragraph, { color: colors.white }]}>
          There are currently no rooms available to join.
          Please come back later.
        </Text>
      }

      {(availableRoomsList && availableRoomsList.new && availableRoomsList.new.length > 0) &&
        <>
          <Text style={styles.paragraph}>Join a newly created room and take part in writing a story from the beginning!</Text>
          <StoryList
            listItemInfo={availableRoomsList.new}
            confirmJoin={true}
          />
        </>

      }

      {(availableRoomsList && availableRoomsList.ongoing && availableRoomsList.ongoing.length > 0) &&
        <>
          <Text style={styles.h1}>Looking for people</Text>
          <Text style={styles.paragraph}>Rooms with ongoing story that has one or more spots open to fill</Text>
          <StoryList
            listItemInfo={availableRoomsList.ongoing}
            confirmJoin={true}
          />
        </>
      }

    </ScrollView>
  );
}