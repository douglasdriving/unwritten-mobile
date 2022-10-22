import { Welcome } from './components/welcome';
import { Menu } from './components/menu';
import { Join } from './components/join';
import { Game } from './components/game/game';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Popup } from './components/popup';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GetUser } from './backendCalls/backendCalls';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState();

  const loadUser = async () => {
    const loadedUser = await GetUser();
    setUser(loadedUser);
  };

  useEffect(() => {
    loadUser();
  }, [])

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
        <Stack.Screen
          name="Game"        >
          {(props) => <Game {...props} user={user}/>}
        </Stack.Screen>

      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}