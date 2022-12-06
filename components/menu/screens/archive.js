import { Text, ScrollView, View } from 'react-native';
import { colors, styles } from '../../../style';
import { useState, useCallback } from 'react';
import { GetFinishedStories } from '../../../backend/backendCalls';
import { useFocusEffect } from '@react-navigation/native';
import { StoryList } from '../modularComponents/storyList/storylist';
import { Space } from '../../smart/visuals';

export const Archive = () => {

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
    <View style={styles.container}>
      <Text style={styles.h1}>Archive</Text>
      <Text style={[styles.paragraph, { color: colors.white }]}>
        {storiesList.length > 0 ?
          `A collection of the ${storiesList.length} stories finished so far in Unwritten`
          :
          `Finished stories will appear here`
        }
      </Text>
      {storiesList.length > 0 &&
        <ScrollView style={styles.scrollBox}>
          <StoryList listItemInfo={storiesList} />
          {Space(20)}
        </ScrollView>
      }
    </View>

  );
}