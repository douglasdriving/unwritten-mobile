import { Text, ScrollView } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';
import { useState, useEffect } from 'react';
import { GetFinishedStories } from '../../backendCalls/backendCalls';

export const Archive = () => {

  const storyCount = 11; //fake var, will be calculated from backend load stories

  const [finishedStories, setFinishedStories] = useState();

  const LoadStories = async () => {
    const stories = await GetFinishedStories();
    setFinishedStories(stories);
  }

  useEffect(() => {
    LoadStories();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Archive</Text>
      <Text style={styles.body}>A collection of all {storyCount} stories finished so far in Unwritten</Text>
      <StoryList type={'finished'} rooms={finishedStories}></StoryList>
    </ScrollView>
  );
}