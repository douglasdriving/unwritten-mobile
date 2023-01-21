import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { JoinRoom } from "./screens/joinRoom.js";
import { OpenRoom } from "./screens/openRoom/openRoom.js";
import { MyRooms } from "./screens/myRooms.js";
import { Archive } from "./screens/archive.js";
import { MenuScreenHeader } from "./modularComponents/menuScreenHeader.js";
import { Profile } from "./screens/profile/profile.js";
import { colors } from "../../style.js";
import { Space } from "../smart/visuals.js";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: colors.dark,
  tabBarInactiveBackgroundColor: colors.fire,
  // tabBarActiveTintColor: colors.fire,
  // tabBarInactiveTintColor: colors.light,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    height: 100,
    borderTopWidth: 0,
  },
};

export const Menu = (menuProps) => {

  return (
    <>
      <Tab.Navigator screenOptions={screenOptions}>

        <Tab.Screen
          name='Join Room'
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicon
                name="bonfire"
                size={45}
                color={focused ? colors.fire : colors.light}
              />
            )
          }}
        >
          {() => <JoinRoom {...menuProps} />}
        </Tab.Screen>

        <Tab.Screen
          name='Open New Room'
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="fire"
                size={50}
                color={focused ? colors.fire : colors.light}
              />
            )
          }}
        >
          {(props) => <OpenRoom {...menuProps} />}
        </Tab.Screen>

        <Tab.Screen
          name='My Rooms'
          options={{
            tabBarIcon: ({ focused }) => (
              <Fontisto
                name="tent"
                size={40}
                color={focused ? colors.fire : colors.light}
              />
            )
          }}
        >
          {() => <MyRooms {...menuProps} />}
        </Tab.Screen>

        <Tab.Screen
          name='Archive'
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicon
                name="library"
                size={40}
                color={focused ? colors.fire : colors.light}
              />
            )
          }}
        >
          {() => <Archive {...menuProps} />}
        </Tab.Screen>

        <Tab.Screen
          name='Profile'
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicon
                name="person"
                size={40}
                color={focused ? colors.fire : colors.light}
              />
            )
          }}
        >
          {() => <Profile />}
        </Tab.Screen>

      </Tab.Navigator>

    </>



  );
}