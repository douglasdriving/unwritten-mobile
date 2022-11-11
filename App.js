import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GetUser, setAuthToken as setAuthTokenForBackendCalls } from './backend/backendCalls';
import { Welcome } from './components/menu/newUser/welcome';
import { Menu } from './components/menu/menu';
import { Join } from './components/menu/newUser/join';
import { Game } from './components/game/game';
import { AuthTokenContext } from './contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState();
  const [authToken, setAuthToken] = useState();

  const checkIfLoggedIn = async () => {
    if (!authToken) return;
    const user = await GetUser(authToken);
    if (user.id) setUser(user);
  }

  const fetchAuthTokenFromStorage = async () => {
    const tokenInStorage = await AsyncStorage.getItem('authToken')
    if(tokenInStorage !== null) {
      setAuthToken(tokenInStorage);
    }
  }

  //get auth token from phone storage when starting the app
  useEffect(() => {fetchAuthTokenFromStorage();}, [])

  //run when the auth token var is updated
  useEffect(() => {
    setAuthTokenForBackendCalls(authToken);
    checkIfLoggedIn();
  }, [authToken]);

  

  const AppNavigator = () => {

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {(!authToken || !user) && <Stack.Screen name="Welcome" component={Welcome} />}

        <Stack.Screen name="Menu">
          {(props) => <Menu {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="Join" component={Join} />

        <Stack.Screen name="Game">
          {(props) => <Game {...props} user={user} />}
        </Stack.Screen>

      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AuthTokenContext.Provider value={[authToken, setAuthToken]}>
        <AppNavigator />
      </AuthTokenContext.Provider>
    </NavigationContainer>
  );
}