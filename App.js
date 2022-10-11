import { Welcome } from './components/welcome';
import { Menu } from './components/menu';
import { Join } from './components/join';
import { Game } from './components/game/game';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Popup } from './components/popup';

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

export default function App() {

  const [popup, setPopup] = useState();
  const [user, setUser] = useState();

  // useEffect(() => {
  //   console.log('signed in as ', user);
  // })

  function screenToRender() {
    if (!user) {
      return (<Welcome setUser={(user) => setUser(user)} />);
    }
    else {
      return (<Menu user={user} />);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {screenToRender()}
      {popup && <Popup popup={popup} />}
    </View>
  );
}