import { Text, ScrollView } from 'react-native';
import { styles } from '../../../style';
import { useState, useCallback } from 'react';
import { GetFinishedStories } from '../../../backend/backendCalls';
import { useFocusEffect } from '@react-navigation/native';
import { StoryList } from '../modularComponents/storyList/storylist';
import { MenuScreenHeader } from '../modularComponents/menuScreenHeader';
import { Spacer } from '../../smart/visuals';

export const Archive = (props) => {

  const [storiesList, setStoriesList] = useState([]);

  const LoadStories = async () => {
    const stories = await GetFinishedStories();
    const storiesInfo = stories.map(room => {

      return {
        title: room.title,
        description: room.description,
        creator: room.creator,
        authors: room.writers,
        roomId: room.id,
        buttonText: 'Read ->'
      }

    })
    setStoriesList(storiesInfo);
  }

  useFocusEffect(
    useCallback(() => {
      LoadStories();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <MenuScreenHeader  {...props}/>
      <Text style={styles.h1}>Archive</Text>
      <Text style={styles.body}>A collection of the {storiesList.length} stories finished so far in Unwritten</Text>
      <StoryList listItemInfo={storiesList} {...props} />
      <Spacer/>
    </ScrollView>
  );
}