import { Text, View, Button } from 'react-native';
import {styles} from '../style.js';
import { NavigationContainer, useNavigation} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const Menu = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.h1}>Unwritten Menu</Text>
    </View>
  );
}