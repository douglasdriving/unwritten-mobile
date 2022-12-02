import { Text, View, Button } from 'react-native';
import { styles } from '../../../../style.js';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../../../../backend/notifications.js';
import { LabeledInput } from '../../modularComponents/labeledInput.js';
import { ErrorText } from '../../modularComponents/errorText.js';
import { LoadPopup } from '../../modularComponents/loadPopup.js';
import { BoolStateToggler } from '../../modularComponents/stateToggler.js';
import { Space } from '../../../smart/visuals.js';
import { navigate } from '../../../../contexts/rootNavigation.js';

//redux imports
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser, loadLocalToken, createUserAndFetchToken, fetchTokenWithCredentials } from '../../../../redux/userSlice.js';

export const LoginScreen = (props) => {

  //redux
  const dispatch = useDispatch();

  //form fields
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();

  //page display
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(false);
  
  //login functions
  const tryLoginStart = async () => {

    //try loading a token and use it to login
    const tokenInStorage = await tryLoadTokenFromStorage();
    if (!tokenInStorage || tokenInStorage == '') return;
    const gotUser = await tryLogin();
    return gotUser;

  }
  const tryLoadTokenFromStorage = async () => {

    //try loading an auth token from the local phone storage
    const token = await dispatch(loadLocalToken());
    return (token.payload);

  }
  const tryLogin = async () => {

    //try using the auth token to login
    const loginDisp = await dispatch(login());
    const returnedUser = loginDisp.payload;

    if (!returnedUser) return;
    if (!returnedUser.id) return false;
    
    if (props.startRoomId) {
      navigate('Game', { roomId: props.startRoomId });
    }
    else {
      navigate('Menu');
    }
    return true;

  }
  const submitForm = async () => {

    //show load screen
    setLoading(signUp ? 'Creating new user...' : 'Signing in...');

    //fetch token with signup or signin
    if (signUp) {
      const pushToken = await registerForPushNotificationsAsync();
      AsyncStorage.setItem('pushToken', pushToken);
      await dispatch(createUserAndFetchToken({ email, password, displayName, pushToken }));
    }
    else {
      await dispatch(fetchTokenWithCredentials({ email, password }));
    }

    const loggedIn = await tryLogin();

    //failed to login? Show error
    if (!loggedIn) {
      if (signUp) setErrorMessage('Failed to create user, please check your credentials'); //have to know why!!!!! backend will say...
      else setErrorMessage('Failed to login. Please check your credentials'); //have to know why!!! backend will say...
    }

    //hide load screen
    setLoading(false);

  }

  const quickSignIn = async () => {

    //show load screen
    setLoading(signUp ? 'Creating new user...' : 'Signing in...');

    //fetch token with signup or signin
    await dispatch(fetchTokenWithCredentials({ email: 'douglasdriving@gmail.com', password: 'Gammalgrodan80' }));

    const loggedIn = await tryLogin();

    //failed to login? Show error
    if (!loggedIn) {
      if (signUp) setErrorMessage('Failed to create user, please check your credentials'); //have to know why!!!!! backend will say...
      else setErrorMessage('Failed to login. Please check your credentials'); //have to know why!!! backend will say...
    }

    //hide load screen
    setLoading(false);

  }

  //update page
  useEffect(() => { tryLoginStart() }, []);
  useEffect(() => { setErrorMessage(null) }, [email, password, displayName, signUp])

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
        <Button
          title={'Quick Sign In'}
          onPress={quickSignIn}
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