import { Welcome } from './components/welcome';
import { Menu } from './components/menu';
import { Join } from './components/join';
import { Game } from './components/game/game';
import { Popup } from './components/popup';
import { View, Text, Modal, StyleSheet } from 'react-native';

export default function App() {
  return (
      // <Welcome/>
      <Menu />
      //<Game readOnly={true} />
      //<Popup
      //   title={'popup'}
      //   description={'this is an awesome popup'}
      // />
  );
}