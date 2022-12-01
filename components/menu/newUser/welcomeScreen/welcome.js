import { Text, View, Button } from 'react-native';
import { styles } from '../../../../style.js';
import { hasToken, signIn as signInBackend, signUp as signUpBackend } from '../../../../backend/backendCalls.js';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { AuthTokenContext } from '../../../../contexts/authContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../../../../backend/notifications.js';
import { LabeledInput } from '../../modularComponents/labeledInput.js';
import { ErrorText } from '../../modularComponents/errorText.js';
import { LoadPopup } from '../../modularComponents/loadPopup.js';
import { BoolStateToggler } from '../../modularComponents/stateToggler.js';
import { Space } from '../../../smart/visuals.js';

export const Welcome = (props) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();

  const [loading, setLoading] = useState();
  const [authToken, setAuthToken] = useContext(AuthTokenContext); //replace redux
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const submitForm = async () => {

    setLoading(signUp ? 'Creating new user...' : 'Signing in...');

    let response;
    if (signUp) {
      const pushToken = await registerForPushNotificationsAsync();
      AsyncStorage.setItem('pushToken', pushToken);
      response = await signUpBackend(email, password, displayName, pushToken); //this also needs to set the creds in user! should be a separate call for that in the user slice?
    }
    else response = await signInBackend(email, password); //should "fetchWithCredentials" instead, which will call the backend too

    if (response.ok) { //then, check if we managed to fetch an auth token, and try to login with it :)
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

  const DevLoginButton = props => {
    return (
      <Button
        title={props.email}
        onPress={
          async () => {

            setLoading('Signing in...');
            const response = await signInBackend(props.email, props.password);

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
        }
      />
    )
  }

  return (
    <View style={styles.fullScreenCentered}>

      <Text style={styles.title}>Unwritten</Text>
      <Text style={{ ...styles.paragraph, ...styles.textCenter }}>Welcome to the world of Unwritten!</Text>
      <Text style={{ ...styles.paragraph, ...styles.textCenter }}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
      {Space(20)}

      <View style={styles.formField}>
        <Text style={styles.h1}>Sign {signUp ? 'Up' : 'In'}</Text>

        <LabeledInput label={'Email'} onChangeText={text => { setEmail(text) }} />
        <LabeledInput label={'Password'} onChangeText={text => { setPassword(text) }} />
        {signUp && <LabeledInput label={'Display Name'} onChangeText={text => { setDisplayName(text) }} />}
        {Space(10)}
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

      </View>

    </View>
  );
}