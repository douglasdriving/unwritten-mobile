import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GetUser } from './backend/backendCalls';
import { Welcome } from './components/menu/newUser/welcome';
import { Menu } from './components/menu/menu';
import { Join } from './components/menu/newUser/join';
import { Game } from './components/game/game';
import { AuthTokenContext } from './contexts/authContext';

const Stack = createStackNavigator();

// const loadUser = async () => {
//   const loadedUser = await GetUser();
//   setUser(loadedUser);
// };

export default function App() {

  const [user, setUser] = useState();
  const [authToken, setAuthToken] = useState();

  // useEffect(() => {
  //   loadUser();
  // }, [])

  useEffect(() => {
    console.log('your auth token is: ', authToken);
  }, [authToken]);

  const AppNavigator = () => {

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Welcome">
          {(props) => <Welcome {...props} setUser={(user) => setUser(user)} />}
        </Stack.Screen>

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