import * as React from 'react';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, View, Text, Image } from 'react-native';
import { colors2, styles, textColors2 } from '../../../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../../redux/userSlice';
import { MyButton } from '../../../smart/myButton';

WebBrowser.maybeCompleteAuthSession();

export const AuthButton = ({ tryLogin }) => {

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '245256210744-45nnlvjt21a0af0r6mr359jrehgqv2sg.apps.googleusercontent.com',
    androidClientId: '245256210744-8919b5l27h0temhqlko7ls6omfn9euq1.apps.googleusercontent.com',
  });

  const CheckSuccessfulToken = async () => {
    if (response?.type != "success") {
      return
    };

    const foundToken = response.authentication.accessToken

    //save it in local storage
    await AsyncStorage.setItem('authToken', foundToken);

    //save it in user slice & for backend calls
    dispatch(setToken(foundToken));

    //use the "login" function in the user slice
    tryLogin();

  }

  const FakeSignIn = async () => {
    //save it in local storage
    await AsyncStorage.setItem('authToken', "fakeToken");

    //save it in user slice & for backend calls
    dispatch(setToken("fakeToken"));

    //use the "login" function in the user slice
    tryLogin();
  }

  useEffect(() => { CheckSuccessfulToken(); }, [response])

  return (
    <>
      <MyButton
        disabled={!request}
        onPress={() => {
          // promptAsync();
          FakeSignIn();
        }}
        title='Enter'
        width={'100%'}
      />
      {error &&
        < Text style={[styles.paragraph, textColors2.red]}>
          {error}
        </Text >
      }
    </>

  );
}