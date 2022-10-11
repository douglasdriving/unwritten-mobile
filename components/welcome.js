import { Text, View, Button, StyleSheet } from 'react-native';
import {styles} from '../style.js';
import { GetUser } from '../backendCalls/fakeBackend.js';

export const Welcome = (props) => {

  const SignIn = async () => {
    const user = await GetUser();
    props.setUser(user);
    return;
  }

  return(
    <View style={specialStyles.screen}>
      <Text style={styles.h1}>Unwritten</Text>
      <Text style={styles.body}>Welcome to the world of Unwritten!</Text>
      <Text style={styles.body}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
      <Button
        title='Sign In'
        onPress={SignIn}
      />
    </View>
  );
}

const specialStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    textAlign: 'center',
  },

});