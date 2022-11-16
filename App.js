import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GetUser, setAuthToken as setAuthTokenForBackendCalls } from './backend/backendCalls';
import { Welcome } from './components/menu/newUser/welcomeScreen/welcome';
import { Menu } from './components/menu/menu';
import { Join } from './components/menu/newUser/join';
import { Game } from './components/game/game';
import { AuthTokenContext } from './contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState();
  const [authToken, setAuthToken] = useState();
  const [startRoomId, setStartRoomId] = useState(); //make sure to set this if user is pressing a notification! in notification handler :)

  const tryLoginWithAuthToken = async () => {
    if (!authToken) return;
    const receivedUser = await GetUser(authToken);
    if (receivedUser.id) setUser(receivedUser);
  }

  const loadAuthTokenLocal = async () => {
    const tokenInStorage = await AsyncStorage.getItem('authToken')
    if (tokenInStorage !== null && tokenInStorage != '') {
      setAuthToken(tokenInStorage);
    }
  }

  const addNotificationHandler = () => {
    Notifications.addNotificationResponseReceivedListener(res => {
      const data = res.notification.request.content.data;

      if (data.roomId) {
        setStartRoomId(data.roomId);
      }
      else {
        console.error('no roomId found in the notification data');
      }
    });
  }

  //app start
  useEffect(() => {
    loadAuthTokenLocal();
    addNotificationHandler();
  }, []);

  //auth token updated
  useEffect(() => {
    setAuthTokenForBackendCalls(authToken);
    tryLoginWithAuthToken();
  }, [authToken]);

  return (
    <NavigationContainer>
      <AuthTokenContext.Provider value={[authToken, setAuthToken]}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Welcome">
            {(props) => <Welcome {...props} startRoomId={startRoomId} user={user} />}
          </Stack.Screen>

          <Stack.Screen name="Menu">
            {(props) => <Menu {...props} user={user} />}
          </Stack.Screen>

          <Stack.Screen name="Join" component={Join} />

          <Stack.Screen name="Game">
            {(props) => <Game {...props} user={user} />}
          </Stack.Screen>

        </Stack.Navigator>
      </AuthTokenContext.Provider>
    </NavigationContainer>
  );
}