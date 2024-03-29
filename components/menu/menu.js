import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { OpenRoom } from "./screens/openRoom/openRoom.js";
import { Camps } from "./screens/camps/camps.js";
import { Profile } from "./screens/profile/profile.js";
import { Archive } from "./screens/archive/archive.js";
import { appDimensions, colors, colors2, transparentColors } from "../../style.js";
import { FrontPage } from "./screens/frontPage/frontPage.js";
import { Text, View, ImageBackground } from "react-native";
import { WelcomePopup } from "./welcomePopup/welcomePopup.js";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavBarIcon } from "./navBarIcon/navBarIcon.js";
import { MenuScreen } from "./screens/menuScreen.js";
import { InfoPage } from "./screens/info/info.js";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    height: 70,
    borderTopWidth: 0,
    backgroundColor: colors2.night,
    borderTopWidth: 1
  },
};

export const Menu = () => {

  const [welcomeOpen, setWelcomeOpen] = useState(true);

  const CheckIfWelcomeMessageShouldBeHidden = async () => {

    const savedState = await AsyncStorage.getItem('hideWelcomePopup');
    if (savedState == 'hide') setWelcomeOpen(false);
    else if (savedState == 'show') setWelcomeOpen(true);
    else setWelcomeOpen(true);

  }

  useEffect(() => { CheckIfWelcomeMessageShouldBeHidden(); }, []);

  return (
    <>
      {welcomeOpen && <WelcomePopup close={() => setWelcomeOpen(false)} />}

      <Tab.Navigator screenOptions={screenOptions}>

        {/* <Tab.Screen
          name='Front Page'
          options={{
            tabBarIcon: ({ focused }) => (
              <NavBarIcon
                focused={focused}
                IconComp={Ionicon}
                iconSize={30}
                iconName='bonfire'
              />
            )
          }}
        >
          {() => (<MenuScreen ScreenComponent={FrontPage} />)}
        </Tab.Screen> */}

        <Tab.Screen
          name='Camps'
          options={{
            tabBarIcon: ({ focused }) => (
              <NavBarIcon
                focused={focused}
                IconComp={FontAwesome}
                iconSize={23}
                iconName='campground'
              />
            )
          }}
        >
          {() => (<MenuScreen ScreenComponent={Camps} />)}
        </Tab.Screen>

        <Tab.Screen
          name='Create'
          options={{
            tabBarIcon: ({ focused }) => (
              <NavBarIcon
                focused={focused}
                IconComp={MaterialCommunityIcons}
                iconSize={35}
                iconName='fire'
              />
            )
          }}
        // component={OpenRoom}
        >
          {() => (<MenuScreen ScreenComponent={OpenRoom} />)}
        </Tab.Screen>

        <Tab.Screen
          name='Archive'
          options={{
            tabBarIcon: ({ focused }) => (
              <NavBarIcon
                focused={focused}
                IconComp={Entypo}
                iconSize={23}
                iconName='archive'
              />
            )
          }}
        >
          {() => (<MenuScreen ScreenComponent={Archive} />)}
        </Tab.Screen>

        <Tab.Screen
          name='Profile'
          options={{
            tabBarIcon: ({ focused }) => (
              <NavBarIcon
                focused={focused}
                IconComp={Ionicon}
                iconSize={30}
                iconName='person'
              />
            )
          }}
        // component={Profile}
        >
          {() => (<MenuScreen ScreenComponent={Profile} />)}
        </Tab.Screen>

        <Tab.Screen
          name='Info'
          options={{
            tabBarIcon: ({ focused }) => (
              <NavBarIcon
                focused={focused}
                IconComp={Ionicon}
                iconSize={30}
                iconName='information-circle'
              />
            )
          }}
        // component={Profile}
        >
          {() => (<MenuScreen ScreenComponent={InfoPage} />)}
        </Tab.Screen>

      </Tab.Navigator>
    </>
  );
}