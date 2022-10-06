import { Text, View } from 'react-native';
import { styles } from '../../style';
import { StoryList } from './storylist/storylist';

export const JoinRoom = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Join a Room</Text>
      <Text style={styles.h2}>New Rooms</Text>
      <Text style={styles.body}>Join a newly created room and take part in writing a story from the beginning!</Text>
      <StoryList/>
      <Text style={styles.h2}>Looking for people</Text>
      <Text style={styles.body}>Rooms with ongoing story that has one or more spots open to fill</Text>
      <StoryList/>
    </View>
  );
}