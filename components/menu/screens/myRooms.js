import { Text, ScrollView, View } from 'react-native';
import { styles } from '../../../style';
import { GetMyRooms } from '../../../backend/backendCalls';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StoryList } from '../modularComponents/storyList/storylist';
import { MenuScreenHeader } from '../modularComponents/menuScreenHeader';
import { Space } from '../../smart/visuals';

export const MyRooms = (props) => {

  const [myRoomsList, setMyRoomsList] = useState();

  const LoadRooms = async () => {
    const rooms = await GetMyRooms();
    if (!rooms) return false;
    const openRoomsList = rooms.open.map(room => {
      return {
        title: room.title,
        creator: room.creator,
        authors: room.writers,
        turn: parseInt(room.scenario_count) + 1,
        alert: room.users_turn,
        roomId: room.id,
        buttonText: 'Enter ->'
      }
    });
    const closedRoomsList = rooms.closed.map(room => {
      return {
        title: room.title,
        creator: room.creator,
        authors: room.writers,
        roomId: room.id,
        buttonText: 'Read ->'
      }
    });
    const newMyRoomList = {
      open: openRoomsList,
      closed: closedRoomsList
    };
    setMyRoomsList(newMyRoomList);
  }

  useFocusEffect(
    useCallback(() => {
      LoadRooms();
    }, [])
  );
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>My Rooms</Text>

      {!myRoomsList ?
        <Text>You are currently not participating in any rooms! Join a new writing room to have it show here</Text>
        :
        <View>
          <Text style={styles.body}>Writing rooms that you are participating in.</Text>

          <Text style={styles.h2}>Open</Text>
          <Text style={styles.body}>Ongoing story writing</Text>

          {(myRoomsList && myRoomsList.open) && <StoryList listItemInfo={myRoomsList.open} {...props} />}

          <Text style={styles.h2}>Closed</Text>
          <Text style={styles.body}>Finished Stories</Text>

          {(myRoomsList && myRoomsList.closed) && <StoryList listItemInfo={myRoomsList.closed} {...props} />}
        </View>
      }

      {Space(200)}

    </ScrollView>
  );
}