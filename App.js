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
import { addNotificationHandler } from './backend/notifications';
import { navigationRef } from './contexts/rootNavigation';

//redux
import reduxStore from './redux/reduxStore';
import { Provider } from 'react-redux';

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

  //app start
  useEffect(() => {
    loadAuthTokenLocal(); //reduntant after redux?
    addNotificationHandler(setAuthToken, setUser);
  }, []);

  //auth token updated. redundant after redux?
  useEffect(() => {
    setAuthTokenForBackendCalls(authToken);
    tryLoginWithAuthToken();
  }, [authToken]);

  //REMOVE THE "AUTHTOKENCONTEXT.PROVIDE COMPONENT LATER. IT WILL BE REDUNDANT WHEN REDUX IS IMPLEMENTED"
  return (
    <Provider store={reduxStore}>
      <NavigationContainer ref={navigationRef}>
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
    </Provider>
  );
}