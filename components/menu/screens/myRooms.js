import { Text, ScrollView, View } from 'react-native';
import { colors, styles } from '../../../style';
import { GetMyRooms } from '../../../backend/backendCalls';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StoryList } from '../modularComponents/storyList/storylist';
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
    <View style={styles.container}>
      <Text style={styles.h1}>My Rooms</Text>
      <ScrollView style={styles.scrollBox}>
        {!myRoomsList ?
          <Text style={styles.paragraph}>
            You are currently not participating in any rooms!
            Join a new writing room to have it show here
          </Text>
          :
          <View>

            {(myRoomsList && myRoomsList.open) && <StoryList listItemInfo={myRoomsList.open} {...props} />}

            {(myRoomsList && myRoomsList.closed && myRoomsList.closed.length > 0) &&
              <>
                <Text style={styles.h2}>Finished Stories</Text>
                <StoryList listItemInfo={myRoomsList.closed} {...props} />
              </>
            }
          </View>
        }
        {Space(20)}
      </ScrollView>
    </View>

  );
}