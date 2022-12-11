import { Text, View, Button, ImageBackground } from 'react-native';
import { styles } from '../../style.js';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../../backend/notifications.js';
import { LabeledInput } from '../menu/modularComponents/labeledInput.js';
import { ErrorText } from '../menu/modularComponents/errorText.js';
import { LoadPopup } from '../menu/modularComponents/loadPopup.js';
import { BoolStateToggler } from '../menu/modularComponents/stateToggler.js';
import { Space } from '../smart/visuals.js';
import { navigate } from '../../contexts/rootNavigation.js';
import { MyButton } from '../smart/myButton.js';
import { colors } from '../../style.js';
import background from '../../assets/background/starsBackground.png';

//redux imports
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser, loadLocalToken, createUserAndFetchToken, fetchTokenWithCredentials } from '../../redux/userSlice.js';

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
      //should get a message here if we fail..
    }
    else {
      const tokenFetchDisp = await dispatch(fetchTokenWithCredentials({ email, password }));
      //need error handling here! but backend does not return correctly. fix there first...
      // console.log('token fetch disp: ', tokenFetchDisp);
      // if(!tokenFetchDisp.payload.ok){
      //   setErrorMessage(tokenFetchDisp.payload.message);
      //   setLoading(false);
      //   return;
      // }
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

    <View style={{
      flex: 1,
    }}>
      <ImageBackground source={background} resizeMode='cover' style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 30,
        textAlign: 'center',
      }}>
        <Text style={[styles.title, { color: colors.white }]}>Unwritten</Text>
        <Text style={[styles.paragraph, styles.textCenter, { color: colors.white }]}>Welcome to the world of Unwritten!</Text>
        <Text style={[styles.paragraph, styles.textCenter, { color: colors.white }]}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
        {Space(20)}

        <View style={styles.formField}>
          <Text style={styles.h2}>Sign {signUp ? 'Up' : 'In'}</Text>

          <LabeledInput label={'Email'} onChangeText={text => { setEmail(text) }} />
          <LabeledInput
            label={'Password'}
            onChangeText={text => { setPassword(text) }}
            onSubmitEditing={() => {
              if (!signUp) {
                submitForm();
              }
            }}
          />
          {signUp &&
            <LabeledInput
              label={'Display Name'}
              onChangeText={text => { setDisplayName(text) }}
              onSubmitEditing={submitForm}
            />
          }
          {Space(10)}
          <MyButton
            title={'Sign ' + (signUp ? 'Up' : 'In')}
            onPress={submitForm}
            disabled={!email || !password || (signUp && !displayName)}
          />
          <MyButton
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
      </ImageBackground>
    </View >
  );
}