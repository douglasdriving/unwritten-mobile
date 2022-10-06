import { Text, View } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';

export const Archive = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.h1}>Archive</Text>
      <Text style={styles.body}>A collection of all stories finished so far in Unwritten</Text>
      <StoryList type={'finished'}></StoryList>
    </View>
  );
}