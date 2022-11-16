import { Text, View, Button } from 'react-native';
import { styles } from '../../../../style.js';
import { signIn as signInBackend, signUp as signUpBackend } from '../../../../backend/backendCalls.js';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { AuthTokenContext } from '../../../../contexts/authContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../../../../backend/notifications.js';
import { LabeledInput } from '../../modularComponents/labeledInput.js';
import { ErrorText } from '../../modularComponents/errorText.js';
import { LoadPopup } from '../../modularComponents/loadPopup.js';
import { BoolStateToggler } from '../../modularComponents/stateToggler.js';

export const Welcome = (props) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();

  const [loading, setLoading] = useState();
  const [authToken, setAuthToken] = useContext(AuthTokenContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const submitForm = async () => {

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

    setLoading(false);

  }

  const setStartScreen = () => {
    //checking the "user" and "startRoomId" props
    if (!props.user) {
      return
    };
    if (!props.navigation) {
      console.error('no nav prop passed into the welcome component');
      return;
    }

    //nav into the game if we are given a room id on start
    if (props.startRoomId) {
      props.navigation.navigate('Game', { roomId: props.startRoomId });
      return;
    }

    //nav to menu if we are logged in
    props.navigation.navigate('Menu');
  }

  useEffect(setStartScreen, [props.user, props.startRoomId]);
  useEffect(() => { setErrorMessage(null) }, [email, password, displayName, signUp])

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      textAlign: 'center',
    }}>

      <Text style={styles.h1}>Unwritten</Text>
      <Text style={styles.body}>Welcome to the world of Unwritten!</Text>
      <Text style={styles.body}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>

      <Text style={styles.h2}>Sign {signUp ? 'Up' : 'In'}</Text>

      <LabeledInput label={'Email'} onChangeText={text => { setEmail(text) }} />
      <LabeledInput label={'Password'} onChangeText={text => { setPassword(text) }} />
      {signUp && <LabeledInput label={'Display Name'} onChangeText={text => { setDisplayName(text) }} />}

      <Button
        title={'Sign ' + (signUp ? 'Up' : 'In')}
        onPress={submitForm}
        disabled={!email || !password || (signUp && !displayName)}
      />

      <ErrorText message={errorMessage} />
      <LoadPopup isLoading={loading != null && loading != ''} loadText={loading} />
      <BoolStateToggler
        setState={setSignUp}
        state={signUp}
        onText='Already have an account? Press here to sign in instead'
        offText='New to Unwritten? Sign up here'
      />

      <Button
        title='SING IN AS DEV PLEASE REMOVE ME LATER'
        onPress={
          async () => {

            console.log('logging in Douglas');

            setLoading('Signing in...');
            const response = await signInBackend('douglasdriving@gmail.com', 'Killingkebab1');

            if (response.ok) {
              if (!response.token) throw new Error('got no token from signin!');
              setAuthToken(response.token);
              AsyncStorage.setItem('authToken', response.token);
              //props.navigation.navigate('Menu'); //problematic, since we havent recieved user obj yet
            }
            else {
              setErrorMessage(response.message);
            }

            setLoading(false);

          }
        }
      />

    </View>
  );
}