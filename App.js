import { Welcome } from './components/welcome';
import { Menu } from './components/menu';
import { Join } from './components/join';
import { Game } from './components/game/game';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Popup } from './components/popup';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {

  const [popup, setPopup] = useState();
  const [user, setUser] = useState();

  const AppNavigator = () => {
    return (
      <Stack.Navigator>

        <Stack.Screen name="Welcome">
          {(props) => <Welcome {...props} setUser={(user) => setUser(user)} />}
        </Stack.Screen>

        <Stack.Screen name="Menu">
          {(props) => <Menu {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="Join" component={Join} />
        <Stack.Screen name="Game" component={Game} />

      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

//test stuff
// const examplePopup = {
//   isLoading: false,
//   title: 'This is a popup',
//   text: 'A lot of cool shit can be put inside a popup. Kinda whatever you want. Or well, just text and buttons tbh',
//   buttons: [
//     {
//       title: 'press me!',
//     },
//     {
//       title: 'cucumber!',
//     },
//   ]
// }