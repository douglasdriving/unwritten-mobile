import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { styles } from '../../../style.js';
import { signIn as signInBackend, signUp as signUpBackend } from '../../../backend/backendCalls.js';
import { useState } from 'react';
import { Popup } from '../../smart/popup.js';
import { useContext } from 'react';
import { AuthTokenContext } from '../../../contexts/authContext.js';
import { TouchableWithoutFeedback } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../../../backend/notifications.js';

export const Welcome = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();

  const [loading, setLoading] = useState();
  const [authToken, setAuthToken] = useContext(AuthTokenContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleEmailChange = text => {
    setEmail(text);
    setErrorMessage(null);
  }

  const handlePasswordChange = text => {
    setPassword(text);
    setErrorMessage(null);
  }

  const handleDisplayNameChange = text => {
    setDisplayName(text);
    setErrorMessage(null);
  }

  const sendForm = async () => {

    setLoading(signUp ? 'Creating new user...' : 'Signing in...');

    let response;
    if (signUp) {
      const pushToken = await registerForPushNotificationsAsync();
      response = await signUpBackend(email, password, displayName, pushToken);
      AsyncStorage.setItem('pushToken', pushToken);
    }
    else response = await signInBackend(email, password);

    if (response.ok) {
      if (!response.token) throw new Error('got no token from signin!');
      setAuthToken(response.token);
      AsyncStorage.setItem('authToken', response.token);
    }
    else {
      setErrorMessage(response.message);
    }

    setLoading(false)
  }

  return (
    <View style={welcomeScreenStyles.screen}>

      <Text style={styles.h1}>Unwritten</Text>
      <Text style={styles.body}>Welcome to the world of Unwritten!</Text>
      <Text style={styles.body}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
      <Text style={styles.h2}>Sign {signUp ? 'Up' : 'In'}</Text>

      <Text>Email</Text>
      <TextInput onChangeText={handleEmailChange} style={welcomeScreenStyles.inputField} />

      <Text>Password</Text>
      <TextInput onChangeText={handlePasswordChange} style={welcomeScreenStyles.inputField} secureTextEntry={true} />

      {signUp &&
        <>
          <Text>Display Name</Text>
          <TextInput onChangeText={handleDisplayNameChange} style={welcomeScreenStyles.inputField} />
        </>
      }

      <Button
        title={'Sign ' + (signUp ? 'Up' : 'In')}
        onPress={sendForm}
        disabled={!email || !password || (signUp && !displayName)}
      />

      {(errorMessage != null) &&
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      }

      {loading &&
        <Popup title={loading} loading={true} />
      }

      <TouchableWithoutFeedback>
        <Text onPress={() => { setSignUp(!signUp); setErrorMessage(null) }} style={{ textDecorationLine: 'underline' }}>
          {signUp ?
            'Already have an account? Press here to sign in instead'
            :
            'New to Unwritten? Sign up here'
          }
        </Text>
      </TouchableWithoutFeedback>


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