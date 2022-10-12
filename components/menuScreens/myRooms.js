import { Text, ScrollView } from 'react-native';
import { StoryList } from './storylist/storylist';
import { styles } from '../../style';
import { GetMyRooms } from '../../backendCalls/backendCalls';
import { useState, useEffect } from 'react';

export const MyRooms = () => {

  const [myRooms, setMyRooms] = useState();

  const LoadRooms = async () => {
    const rooms = await GetMyRooms();
    setMyRooms(rooms);
    return;
  }

  useEffect(() => { LoadRooms() }, []);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.h1}>My Rooms</Text>
      <Text style={styles.body}>Writing rooms that you are participating in.</Text>

      <Text style={styles.h2}>Open</Text>
      <Text style={styles.body}>Ongoing story writing</Text>

      { (myRooms && myRooms.open) && <StoryList rooms={myRooms.open}/> }

      <Text style={styles.h2}>Closed</Text>
      <Text style={styles.body}>Finished Stories</Text>

      { (myRooms && myRooms.closed) && <StoryList rooms={myRooms.closed}/> }

    </ScrollView>
  );
}