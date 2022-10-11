import { Text, ScrollView } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';
import { GetAvailableRooms } from '../../backendCalls/backendCalls';
import { useEffect, useState } from 'react';

export const JoinRoom = () => {

  const [availableRooms, setAvailableRooms] = useState();

  const LoadRooms = async () => {
    const rooms = await GetAvailableRooms();
    setAvailableRooms(rooms);
    return;
  }

  useEffect(() => {LoadRooms()}, []);

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.h1}>Join a Room</Text>
      <Text style={styles.h2}>New Rooms</Text>
      <Text style={styles.body}>Join a newly created room and take part in writing a story from the beginning!</Text>
      
      {(availableRooms && availableRooms.new) && <StoryList type={'joinable'} rooms={availableRooms.new}/>}
      
      <Text style={styles.h2}>Looking for people</Text>
      <Text style={styles.body}>Rooms with ongoing story that has one or more spots open to fill</Text>
      
      {(availableRooms && availableRooms.ongoing) && <StoryList type={'joinable'} rooms={availableRooms.ongoing}/>}

    </ScrollView>
  );
}