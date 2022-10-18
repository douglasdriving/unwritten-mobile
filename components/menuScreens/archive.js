import { Text, ScrollView } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';
import { useState, useEffect } from 'react';
import { GetFinishedStories } from '../../backendCalls/backendCalls';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

export const Archive = (props) => {

  const storyCount = 11; //fake var, will be calculated from backend load stories

  const [storiesList, setStoriesList] = useState();

  const LoadStories = async () => {
    const rooms = await GetFinishedStories();
    const storiesInfo = rooms.map(room => {
      return {
        //alert: false,
        title: room.title,
        description: room.description,
        creator: room.creator,
        authors: room.authors,
        //authorCount: 3,
        //turn: room.turn,
        //playersTurn: room.playersTurn,
        storyId: room.id,
        buttonText: 'Read ->'
      }
    })
    setStoriesList(storiesInfo);
  }

  useEffect(() => {
    LoadStories();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Archive</Text>
      <Text style={styles.body}>A collection of all {storyCount} stories finished so far in Unwritten</Text>
      <StoryList listItemInfo={storiesList} appNavigation={props.appNavigation}/>
    </ScrollView>
  );
}