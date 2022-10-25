import { Text, View, Button, StyleSheet } from 'react-native';
import { styles } from '../../../style.js';
import { GetUser } from '../../../backend/backendCalls.js';

export const Welcome = (props) => {

  const SignInPremium = async () => {
    const user = await GetUser();
    props.setUser(user);
    props.navigation.navigate('Menu');
  }

  const SignUpNew = async () => {
    // const user = await CreateNewUser();
    // props.setUser(user);
    // props.navigation.navigate('Menu');
  }

  return (
    <View style={specialStyles.screen}>
      <Text style={styles.h1}>Unwritten</Text>
      <Text style={styles.body}>Welcome to the world of Unwritten!</Text>
      <Text style={styles.body}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
      <Button
        title='Sign in as premium user'
        onPress={SignInPremium}
      />
      <Button
        title='Sign up as new user'
        onPress={SignUpNew}
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