import * as React from 'react';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, View, Text, Image } from 'react-native';
import { colors2 } from '../../../../style';

WebBrowser.maybeCompleteAuthSession();

export const AuthButton = () => {

  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '245256210744-45nnlvjt21a0af0r6mr359jrehgqv2sg.apps.googleusercontent.com',
    androidClientId: '245256210744-45nnlvjt21a0af0r6mr359jrehgqv2sg.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      // accessToken && setTimeout(fetchUserInfo, 20000);
      console.log('got auth token: ', accessToken)
    }
  }, [response, accessToken])

  const fetchUserInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const userInfo = await response.json();
    setUserId(userInfo.id);
    console.log('user id: ', userInfo.id);
  }

  return (
    <View>

      {userId ?

        <View>
          <Image source={{ uri: userId.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userId.name}</Text>
        </View>

        :

        <Button
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
          title='sign in with google'
        />
      }

    </View>
  );
}