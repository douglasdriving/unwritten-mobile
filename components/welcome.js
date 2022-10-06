import { Text, View, Button } from 'react-native';
import {styles} from '../style.js';

export const Welcome = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.h1}>Unwritten</Text>
      <Text style={styles.body}>Welcome to the world of Unwritten!</Text>
      <Text style={styles.body}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
      <Button title='Sign In'/>
    </View>
  );
}