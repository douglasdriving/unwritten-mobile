import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { JoinRoom } from "./screens/joinRoom.js";
import { OpenRoom } from "./screens/openRoom/openRoom.js";
import { MyRooms } from "./screens/myRooms.js";
import { Archive } from "./screens/archive.js";
import { MenuScreenHeader } from "./modularComponents/menuScreenHeader.js";
import { colors } from "../../style.js";

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
      <MenuScreenHeader {...menuProps} />
      <Tab.Navigator screenOptions={screenOptions}>

        <Tab.Screen
          name='Join Room'
          options={{
            tabBarIcon: () => (<Icon name="add-circle-outline" size={26} color={colors.white}/>)
          }}
        >
          {() => <JoinRoom {...menuProps} />}
        </Tab.Screen>

        <Tab.Screen
          name='Open New Room'
          options={{
            tabBarIcon: () => (<Icon name="key" size={26} color={colors.white}/>)
          }}
        >
          {(props) => <OpenRoom {...menuProps} />}
        </Tab.Screen>

        <Tab.Screen
          name='My Rooms'
          options={{
            tabBarIcon: () => (<Icon name="home" size={26} color={colors.white}/>)
          }}
        >
          {() => <MyRooms {...menuProps} />}
        </Tab.Screen>

        <Tab.Screen
          name='Archive'
          options={{
            tabBarIcon: () => (<Icon name="folder" size={26} color={colors.white}/>)
          }}
        >
          {() => <Archive {...menuProps} />}
        </Tab.Screen>

      </Tab.Navigator>

    </>



  );
}