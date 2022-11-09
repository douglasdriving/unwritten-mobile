import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { styles } from '../../../style.js';
import { signIn as signInBackend } from '../../../backend/backendCalls.js';
import { useState } from 'react';
import { Popup } from '../../smart/popup.js';
import { useContext } from 'react';
import { AuthTokenContext } from '../../../contexts/authContext.js';

export const Welcome = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [authToken, setAuthToken] = useContext(AuthTokenContext);
  const [wrongCreds, setWrongCreds] = useState(false);

  const handleEmailChange = text => {
    setEmail(text);
    setWrongCreds(false);
  }

  const handlePasswordChange = text => {
    setPassword(text);
    setWrongCreds(false);
  }

  const signIn = async () => {
    setLoading('Signing In...');
    const signInResponse = await signInBackend(email, password);
    if (signInResponse.ok) {
      if (!signInResponse.token) throw new Error('got no token from signin!');
      setAuthToken(signInResponse.token);
    }
    else {
      setWrongCreds(true);
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
      {wrongCreds &&
        <Text style={{ color: 'red' }}>Wrong email or password</Text>
      }
      {loading &&
        <Popup title={loading} loading={true} />
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