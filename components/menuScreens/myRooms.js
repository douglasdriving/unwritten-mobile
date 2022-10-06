import { Text, View } from 'react-native';
import { StoryList } from './storylist/storylist';
import { styles } from '../../style';

export const MyRooms = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.h1}>My Rooms</Text>
      <Text style={styles.body}>Writing rooms that you are participating in.</Text>
      <Text style={styles.h2}>Open</Text>
      <Text style={styles.body}>Ongoing story writing</Text>
      <StoryList type={'ongoing'}></StoryList>
      <Text style={styles.h2}>Closed</Text>
      <Text style={styles.body}>Finished Stories</Text>
      <StoryList type={'finished'}></StoryList>
    </View>
  );
}