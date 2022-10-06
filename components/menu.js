import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { JoinRoom } from './menuScreens/joinRoom.js';
import { OpenRoom } from './menuScreens/openRoom.js';
import { MyRooms } from "./menuScreens/myRooms.js";
import { Archive } from "./menuScreens/archive.js";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: 'lightblue',
  tabBarInactiveBackgroundColor: 'darkgray',
  headerShown: false,
};

export const Menu = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name='Join Room'
          component={JoinRoom}
          options={{
            tabBarIcon: () => (<Icon name="add-circle-outline" size={26}/>)
          }}
        />
        <Tab.Screen
          name='Open New Room'
          component={OpenRoom}
          options={{
            tabBarIcon: () => (<Icon name="key" size={26}/>)
          }}
        />
        <Tab.Screen
          name='My Rooms'
          component={MyRooms}
          options={{
            tabBarIcon: () => (<Icon name="home" size={26}/>)
          }}
        />
        <Tab.Screen
          name='Archive'
          component={Archive}
          options={{
            tabBarIcon: () => (<Icon name="folder" size={26}/>)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}