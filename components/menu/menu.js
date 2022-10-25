import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { JoinRoom } from "./screens/joinRoom.js";
import { OpenRoom } from "./screens/openRoom/openRoom.js";
import { MyRooms } from "./screens/myRooms.js";
import { Archive } from "./screens/archive.js";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: 'lightblue',
  tabBarInactiveBackgroundColor: 'darkgray',
  tabBarHideOnKeyboard: true,
  headerShown: false,
};

export const Menu = (menuProps) => {

  return (

    <Tab.Navigator screenOptions={screenOptions}>

      <Tab.Screen
        name='Join Room'
        options={{
          tabBarIcon: () => (<Icon name="add-circle-outline" size={26} />)
        }}
      >
        {() => <JoinRoom {...menuProps} />}
      </Tab.Screen>

      <Tab.Screen
        name='Open New Room'
        options={{
          tabBarIcon: () => (<Icon name="key" size={26} />)
        }}
      >
        {(props) => <OpenRoom {...menuProps} />}
      </Tab.Screen>

      <Tab.Screen
        name='My Rooms'
        options={{
          tabBarIcon: () => (<Icon name="home" size={26} />)
        }}
      >
        {() => <MyRooms {...menuProps} />}
      </Tab.Screen>

      <Tab.Screen
        name='Archive'
        options={{
          tabBarIcon: () => (<Icon name="folder" size={26} />)
        }}
      >
        {() => <Archive {...menuProps} />}
      </Tab.Screen>

    </Tab.Navigator>

  );
}