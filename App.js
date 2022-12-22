//IMPORTS
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Menu } from './components/menu/menu';
import { Join } from './components/join/join';
import { Game } from './components/game/game';
import { addNotificationHandler } from './backend/notifications';
import { navigationRef } from './contexts/rootNavigation';
import { LoginScreen } from './components/login/loginScreen';
import { useFonts } from 'expo-font';
import reduxStore from './redux/reduxStore';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

export default function App() {

  const [startRoomId, setStartRoomId] = useState();

  const [fontsLoaded] = useFonts({
    'Title': require('./assets/fonts/LibreBaskerville-Regular.ttf'),
    'Title-Bold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
    'Body': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'Body-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
  });

  //app start
  useEffect(() => {
    addNotificationHandler();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={reduxStore}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Welcome">
            {(props) =>
              <LoginScreen {...props} startRoomId={startRoomId} />
            }
          </Stack.Screen>

          <Stack.Screen name="Menu">
            {(props) => <Menu {...props} />}
          </Stack.Screen>

          <Stack.Screen name="Join" component={Join} />

          <Stack.Screen name="Game">
            {(props) => <Game {...props} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}