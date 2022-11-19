import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUser } from './backendCalls';

export const registerForPushNotificationsAsync = async () => {

  console.log('starting notification registration');

  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications');
    return;
  }

  // we check if we have access to the notification permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;


  if (existingStatus !== 'granted') {
    // if we don't have access to it, we ask for it
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    // user does not allow us to access to the notifications
    alert('Failed to get push token for push notification!');
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

export const addNotificationHandler = (setAuthToken, setUser, setStartRoomId) => {

  Notifications.addNotificationResponseReceivedListener(async res => {

    const { roomId, userId, type } = res.notification.request.content.data;

    if (type == 'kick') return;

    if (!roomId) {
      console.error('no roomId found in the notification data');
      return;
    }
    if (!userId) {
      console.error('no userId found in the notification data');
      return;
    }

    const authTokenInStorage = await AsyncStorage.getItem('authToken');
    if (!authTokenInStorage) return;
    const preloggedUser = await GetUser(authTokenInStorage);

    if (preloggedUser.id != userId) {
      setAuthToken('');
      AsyncStorage.setItem('authToken', '');
      setUser(null);
      return;
    }

    setStartRoomId(roomId);
  });

}