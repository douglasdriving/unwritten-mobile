import { Text, View, Button } from 'react-native';
import {styles} from '../../../style.js';

export const Join = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.h1}>Join Unwritten</Text>
      <Text style={styles.body}>Become part of Unwrittens collaborative writing community! As a member, you can participate in as many stories as you like, and you get to start your own stories.</Text>
      <Button title='Join Unwritten (19kr/month)'/>
    </View>
  );
}