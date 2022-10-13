import { Text, ScrollView } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';
import { GetAvailableRooms } from '../../backendCalls/backendCalls';
import { useEffect, useState } from 'react';
import { Popup } from '../popup';

export const JoinRoom = (props) => {

  console.log(props.user);

  const [availableRoomsList, setAvailableRoomsList] = useState();

  const LoadRooms = async () => {
    const rooms = await GetAvailableRooms();

    const newRoomsList = rooms.new.map(room => {
      return {
        //alert: false,
        title: room.title,
        description: room.description,
        creator: room.creator,
        //authors: room.authors,
        //authorCount: 3,
        //turn: room.turn,
        //playersTurn: room.playersTurn,
        storyId: room.id,
        buttonText: 'Join ->'
      }
    });

    const ongoingRoomsList = rooms.ongoing.map(room => {
      return {
        //alert: false,
        title: room.title,
        description: room.description,
        creator: room.creator,
        //authors: room.authors,
        authorCount: room.authors.length + 1,
        turn: room.turn,
        // playersTurn: room.playersTurn,
        storyId: room.id,
        buttonText: 'Join ->'
      }
    });

    const newList = {
      new: newRoomsList,
      ongoing: ongoingRoomsList
    };;

    setAvailableRoomsList(newList);
  }

  useEffect(() => { LoadRooms() }, []);

  return (
    <ScrollView style={styles.container}>

      {props.user.new &&
        <Popup
          title='Welcome to Unwritten!'
          text='As a free user, you can join 2 rooms to write stories,
          and access the library of finished stories. Start by joining a room!
          If you want to play unlimited stories and create your own,
          consider joining Unwritten'
          buttons={[
            {
              title: 'Join Unwritten',
              handlePress: () => {props.appNavigation.navigate('Join')}
            },
          ]}
        />
      }

      <Text style={styles.h1}>Join a Room</Text>
      <Text style={styles.h2}>New Rooms</Text>
      <Text style={styles.body}>Join a newly created room and take part in writing a story from the beginning!</Text>

      {(availableRoomsList && availableRoomsList.new) && <StoryList listItemInfo={availableRoomsList.new} appNavigation={props.appNavigation} />}

      <Text style={styles.h2}>Looking for people</Text>
      <Text style={styles.body}>Rooms with ongoing story that has one or more spots open to fill</Text>

      {(availableRoomsList && availableRoomsList.ongoing) && <StoryList listItemInfo={availableRoomsList.ongoing} appNavigation={props.appNavigation} />}

    </ScrollView>
  );
}