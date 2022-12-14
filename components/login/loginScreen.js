import { Text, View, Button, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'expo-checkbox';
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
import { Popup } from '../smart/popup.js';

export const LoginScreen = (props) => {

  //redux
  const dispatch = useDispatch();

  //form fields
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [displayName, setDisplayName] = useState();
  // const [consentChecked, setConsentChecked] = useState(false);

  //page display
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(false);
  // const [termsDocOpen, setTermsDocOpen] = useState(false);

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

    if (!returnedUser) {
      console.error('no user returned in login dispatch. returned payload is: ', loginDisp.payload);
      return false;
    }
    if (!returnedUser.id) {
      console.error('no id on user returned from login dispatch. returned payload is: ', loginDisp.payload);
      return false;
    }

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
      // //check consent form check
      // if (!consentChecked) {
      //   setErrorMessage('In order to sign up, you must agree to the terms and conditions');
      //   setLoading(false);
      //   return;
      // }

      //check repeated pw
      if (password != repeatPassword) {
        setErrorMessage('passwords does not match');
        setLoading(false);
        return;
      }

      //create push token
      const pushToken = await registerForPushNotificationsAsync();
      AsyncStorage.setItem('pushToken', pushToken);

      //create user in backend
      await dispatch(createUserAndFetchToken({ email: userName, password, displayName, pushToken }));
      //should get a message here if we fail..
    }
    else {
      const tokenFetchDisp = await dispatch(fetchTokenWithCredentials({ email: userName, password }));
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

  //update page
  useEffect(() => { tryLoginStart() }, []);
  useEffect(() => { setErrorMessage(null) }, [userName, password, displayName, signUp])

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
        {!signUp &&
          <>
            <Text style={[styles.paragraph, styles.textCenter, { color: colors.white }]}>Welcome to the world of Unwritten!</Text>
            <Text style={[styles.paragraph, styles.textCenter, { color: colors.white }]}>Here, you can read and take part in the creation of hundreds of stories. The destiny of this place lies in your hands!</Text>
          </>
        }
        {Space(20)}

        <View style={styles.formField}>
          <Text style={styles.h2}>Sign {signUp ? 'Up' : 'In'}</Text>

          <LabeledInput label={'Username'} onChangeText={text => { setUserName(text) }} />
          <LabeledInput
            label={'Password'}
            onChangeText={text => { setPassword(text) }}
            secureTextEntry
            onSubmitEditing={() => {
              if (!signUp) {
                submitForm();
              }
            }}
          />
          {signUp &&
            <>
              <LabeledInput
                label={'Repeat Password'}
                onChangeText={text => { setRepeatPassword(text) }}
                secureTextEntry
              />
              <LabeledInput
                label={'Display Name'}
                onChangeText={text => { setDisplayName(text) }}
                onSubmitEditing={submitForm}
              />
              <Text style={[styles.paragraph]}>
                *Note! No password reset system has be implemented yet, so please keep track of your credentials
              </Text>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  style={{ marginRight: 10, width: 25, height: 25 }}
                  value={consentChecked}
                  onValueChange={setConsentChecked}
                  color={consentChecked ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>I agree to the </Text>
                <TouchableWithoutFeedback>
                  <Text
                    onPress={() => setTermsDocOpen(true)}
                    style={{ ...styles.paragraph, textDecorationLine: 'underline' }}
                  >
                    terms and conditions
                  </Text>
                </TouchableWithoutFeedback>
                {termsDocOpen &&
                  <Popup
                    title='Terms and conditions'
                    text='By signing up to Unwritten, you agree that all text that you write in the app will be stored in our database. '
                    onClose={() => setTermsDocOpen(false)}
                  />
                }
              </View> */}
            </>
          }
          {Space(10)}
          <MyButton
            title={'Sign ' + (signUp ? 'Up' : 'In')}
            onPress={submitForm}
            disabled={!userName || !password || (signUp && !displayName)}
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
      </ImageBackground >
    </View >
  );
}