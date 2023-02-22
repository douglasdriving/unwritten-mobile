import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUser, SetExpoToken } from './backendCalls';
import { navigate, navigateToRoom } from '../contexts/rootNavigation';

import { useDispatch } from 'react-redux';
import { loadRoomData } from '../redux/roomSlice';
import { logout } from '../redux/userSlice';
import reduxStore from '../redux/reduxStore';

export const registerForPushNotificationsAsync = async () => {

  console.log('starting notification registration');

  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications');
    return;
  }

  // we check if we have access to the notification permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // if we don't have access to it, we ask for it
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    console.log('notification status requested. status received was: ', status);
  }

  //if user still does not allow it, return
  if (finalStatus !== 'granted') {
    console.log('user did not grant notification permission');
    return;
  }

  // obtain the expo token
  const expoToken = (await Notifications.getExpoPushTokenAsync()).data;

  // ++ save token in the backend
  await SetExpoToken(expoToken);

  // some android configuration
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return expoToken;
}

export const addNotificationHandler = () => {

  // determines what will happen in a player presses a notification
  // might be broken now?

  Notifications.addNotificationResponseReceivedListener(async res => {

    //get the data
    const { roomId, userId, type } = res.notification.request.content.data;

    //make sure there is a room id
    if (!roomId) {
      console.error('no roomId found in the notification data, cant enter camp');
      return;
    }

    //make sure player is logged in
    const authTokenInStorage = await AsyncStorage.getItem('authToken');
    if (!authTokenInStorage) {
      console.error('no auth token in storage, cant enter a camp from the notification');
      return
    };
    const preloggedUser = await GetUser(authTokenInStorage);
    if (!preloggedUser) {
      console.error('no user logged in, cant enter a camp from the notification');
      return;
    }

    //set room and navigate to it
    await reduxStore.dispatch(loadRoomData({ id: roomId }));
    await navigateToRoom(roomId);

  });

}