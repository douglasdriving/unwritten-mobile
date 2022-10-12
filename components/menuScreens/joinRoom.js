import { Text, ScrollView } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';
import { GetAvailableRooms } from '../../backendCalls/backendCalls';
import { useEffect, useState } from 'react';

export const JoinRoom = () => {

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
        //authorsTurn: room.authorsTurn,
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
        // authorsTurn: room.authorsTurn,
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

  useEffect(() => {LoadRooms()}, []);

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.h1}>Join a Room</Text>
      <Text style={styles.h2}>New Rooms</Text>
      <Text style={styles.body}>Join a newly created room and take part in writing a story from the beginning!</Text>
      
      {(availableRoomsList && availableRoomsList.new) && <StoryList listItemInfo={availableRoomsList.new} message='I am from the join room page'/>}
      
      <Text style={styles.h2}>Looking for people</Text>
      <Text style={styles.body}>Rooms with ongoing story that has one or more spots open to fill</Text>
      
      {(availableRoomsList && availableRoomsList.ongoing) && <StoryList listItemInfo={availableRoomsList.ongoing}/>}

    </ScrollView>
  );
}