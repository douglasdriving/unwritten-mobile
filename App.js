import { Welcome } from './components/welcome';
import { Menu } from './components/menu';
import { Join } from './components/join';
import { Game } from './components/game/game';
import { Popup } from './components/popup';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [popup, setPopup] = useState(null);

  return (
      <View>
        <Menu />
      </View>
  );
}