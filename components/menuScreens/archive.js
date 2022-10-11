import { Text, ScrollView } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';

export const Archive = () => {

  const storyCount = 11; //fake var, will be calculated from backend load stories

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Archive</Text>
      <Text style={styles.body}>A collection of all {storyCount} stories finished so far in Unwritten</Text>
      <StoryList type={'finished'}></StoryList>
    </ScrollView>
  );
}