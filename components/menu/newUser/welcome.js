import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { styles } from '../../../style.js';
import { signIn as signInBackend } from '../../../backend/backendCalls.js';
import { useState } from 'react';
import { Popup } from '../../smart/popup.js';
import { useContext } from 'react';
import { AuthTokenContext } from '../../../contexts/authContext.js';

export const Welcome = (props) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [authToken, setAuthToken] = useContext(AuthTokenContext);

  const handleEmailChange = text => {
    setEmail(text);
  }

  const handlePasswordChange = text => {
    setPassword(text);
  }

  const signIn = async () => {
    setLoading('Signing In...');
    const signInResponse = await signInBackend(email, password);
    if (signInResponse.ok) {
      if(!signInResponse.token) throw new Error('got no token from signin!');
      setAuthToken(signInResponse.token);
      //make sure that page re-renders to a logged-in state
      //-> in app.js, set the login stack screen to only render if there is no valid auth token
      //must check that the token is valid for that.
      //can use get logged user - if it returns something then we are logged
    }
    else {
      console.log('failed to log in: ' + signInResponse.message);
      //provide some feedback to the user
      //wrong email or pass. Red fields. standard procedure
    }
    setLoading(false)
  }

  return (
    <View style={welcomeScreenStyles.screen}>
      <Text style={styles.h1}>Unwritten</Text>
      <Text style={styles.body}>Welcome to the world of Unwritten!</Text>
      <Text style={styles.body}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
      <Text style={styles.h2}>Sign In</Text>
      <Text>Email</Text>
      <TextInput onChangeText={handleEmailChange} style={welcomeScreenStyles.inputField} />
      <Text>Password</Text>
      <TextInput onChangeText={handlePasswordChange} style={welcomeScreenStyles.inputField} secureTextEntry={true} />
      <Button title='Sign in' onPress={signIn} />
      {loading &&
        <Popup
          title={loading}
          loading={true}
        />
      }
    </View>
  );
}

const welcomeScreenStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    textAlign: 'center',
  },

  inputField: {
    backgroundColor: 'white',
    width: '100%',
    padding: 0,

  }

});