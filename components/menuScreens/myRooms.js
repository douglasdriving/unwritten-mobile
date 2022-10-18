import { Text, ScrollView, View } from 'react-native';
import { StoryList } from './storylist/storylist';
import { styles } from '../../style';
import { GetMyRooms, GetLoggedUserName } from '../../backendCalls/backendCalls';
import { useState, useEffect } from 'react';

export const MyRooms = (props) => {

  const [myRoomsList, setMyRoomsList] = useState();

  const LoadRooms = async () => {

    const rooms = await GetMyRooms();

    if (!rooms) return false;

    const openRoomsList = rooms.open.map(room => {
      return {
        //alert: false,
        title: room.title,
        //description: room.description,
        creator: room.creator,
        authors: room.authors,
        //authorCount: 3,
        turn: room.turnsTaken,
        playersTurn: (room.nextPlayer == GetLoggedUserName()),
        roomId: room.id,
        buttonText: 'Enter ->'
      }
    });

    const closedRoomsList = rooms.closed.map(room => {
      return {
        //alert: false,
        title: room.title,
        //description: room.description,
        creator: room.creator,
        authors: room.authors,
        //authorCount: room.authors.length + 1,
        //turn: room.turn,
        // playersTurn: room.playersTurn,
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

  useEffect(() => { LoadRooms() }, []);

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

          {(myRoomsList && myRoomsList.open) && <StoryList listItemInfo={myRoomsList.open} appNavigation={props.appNavigation} />}

          <Text style={styles.h2}>Closed</Text>
          <Text style={styles.body}>Finished Stories</Text>

          {(myRoomsList && myRoomsList.closed) && <StoryList listItemInfo={myRoomsList.closed} appNavigation={props.appNavigation} />}
        </View>
      }

    </ScrollView>
  );
}