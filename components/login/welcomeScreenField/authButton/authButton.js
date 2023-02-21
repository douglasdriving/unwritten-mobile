import * as React from 'react';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, View, Text, Image } from 'react-native';
import { colors2 } from '../../../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../../redux/userSlice';

WebBrowser.maybeCompleteAuthSession();

export const AuthButton = ({ tryLogin }) => {

  const dispatch = useDispatch();
  // const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '245256210744-45nnlvjt21a0af0r6mr359jrehgqv2sg.apps.googleusercontent.com',
    androidClientId: '245256210744-45nnlvjt21a0af0r6mr359jrehgqv2sg.apps.googleusercontent.com',
  });

  const CheckSuccessfulToken = async () => {

    if (response?.type != "success") return;

    const foundToken = response.authentication.accessToken
    // setAccessToken(response.authentication.accessToken);
    console.log('got google auth token: ', foundToken);

    //save it in local storage
    await AsyncStorage.setItem('authToken', foundToken);

    //save it in user slice & for backend calls
    dispatch(setToken(foundToken));

    //use the "login" function in the user slice
    tryLogin();

  }

  useEffect(() => { CheckSuccessfulToken }, [response])

  return (
    <Button
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
      title='sign in with google'
    />
  );
}