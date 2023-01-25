import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { OpenRoom } from "./screens/openRoom/openRoom.js";
import { Camps } from "./screens/camps/camps.js";
import { Profile } from "./screens/profile/profile.js";
import { colors } from "../../style.js";
import { FrontPage } from "./screens/frontPage/frontPage.js";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: colors.dark,
  tabBarInactiveBackgroundColor: colors.fire,
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
          name='Front Page'
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
          {() => <FrontPage />}
        </Tab.Screen>

        <Tab.Screen
          name='Camps'
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="campground"
                size={40}
                color={focused ? colors.fire : colors.light}
              />
            )
          }}
        >
          {() => <Camps />}
        </Tab.Screen>

        <Tab.Screen
          name='Create'
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