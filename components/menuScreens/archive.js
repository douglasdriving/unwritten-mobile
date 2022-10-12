import { Text, ScrollView } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';
import { useState, useEffect } from 'react';
import { GetFinishedStories } from '../../backendCalls/backendCalls';

export const Archive = () => {

  const storyCount = 11; //fake var, will be calculated from backend load stories

  const [storiesList, setStoriesList] = useState();

  const LoadStories = async () => {
    const stories = await GetFinishedStories();
    const storiesInfo = stories.map(story => {
      return {
        //alert: false,
        title: story.title,
        description: story.description,
        creator: story.creator,
        authors: story.authors,
        //authorCount: 3,
        //turn: room.turn,
        //playersTurn: room.playersTurn,
        storyId: story.id,
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
      <StoryList type={'finished'} listItemInfo={storiesList}></StoryList>
    </ScrollView>
  );
}