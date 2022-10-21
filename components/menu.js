import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { JoinRoom } from './menuScreens/joinRoom.js';
import { OpenRoom } from './menuScreens/openRoom.js';
import { MyRooms } from "./menuScreens/myRooms.js";
import { Archive } from "./menuScreens/archive.js";
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from "react-native-web";
import { GetLoggedUserName } from "../backendCalls/backendCalls.js";

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
          {() => <JoinRoom appNavigation={menuProps.navigation} user={menuProps.user} />}
        </Tab.Screen>

        <Tab.Screen
          name='Open New Room'
          options={{
            tabBarIcon: () => (<Icon name="key" size={26} />)
          }}
        >
          {(props) => <OpenRoom
            {...props}
            premiumUser={menuProps.user.premium}
            appNavigation={menuProps.navigation}
          />}
        </Tab.Screen>

        <Tab.Screen
          name='My Rooms'
          options={{
            tabBarIcon: () => (<Icon name="home" size={26} />)
          }}
        >
          {() => <MyRooms appNavigation={menuProps.navigation} />}
        </Tab.Screen>

        <Tab.Screen
          name='Archive'
          options={{
            tabBarIcon: () => (<Icon name="folder" size={26} />)
          }}
        >
          {() => <Archive appNavigation={menuProps.navigation} />}
        </Tab.Screen>

      </Tab.Navigator>

  );
}