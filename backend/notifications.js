import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUser } from './backendCalls';
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
  }

  //if user still does not allow it, return
  if (finalStatus !== 'granted') {
    alert(
      `It is highly recommended to use Unwritten with push notification turned on, as this will allow you to know when it's your turn to write. If you want the intended experience, please turn notifications on in your settings. You can always turn them off later if they annoy you :)`
    );
    return;
  }

  // obtain the expo token
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  // log the expo token in order to play with it
  console.log('Your expo token:');
  console.log(token);

  // some android configuration
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const addNotificationHandler = () => {

  console.log('added notification handler :)');

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