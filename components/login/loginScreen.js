import { ImageBackground, Text } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { navigate } from '../../contexts/rootNavigation.js';
import background from '../../assets/background/campfireBackground.png';
import { styles, colors, textColors, textColors2 } from '../../style.js';
import { Space } from '../smart/visuals.js';
import { AuthButton } from './welcomeScreenField/authButton/authButton.js';
import { UserNameField } from './userNameField/userNameField.js';

//redux imports
import { useDispatch } from 'react-redux';
import { login, loadLocalToken } from '../../redux/userSlice.js';
import { registerForPushNotificationsAsync, requestNotificationPermission } from '../../backend/notifications.js';


export const LoginScreen = ({ startRoomId }) => {

  //redux
  const dispatch = useDispatch();

  //page display
  const [loading, setLoading] = useState(true);
  const [newPlayer, setNewPlayer] = useState(false);

  //functions
  const tryLoginStart = async () => {

    //check if there is already a token stored
    const tokenDisp = await dispatch(loadLocalToken());
    const tokenInStorage = tokenDisp.payload;
    if (!tokenInStorage || tokenInStorage == '') {
      console.log('no auth token in storage');
      setLoading(false);
      return;
    };

    //try to login with it
    await tryLogin();

  }
  const tryLogin = async () => {

    //try using the auth token to login
    setLoading(true);
    const loginDisp = await dispatch(login());
    const returnedUser = loginDisp.payload;

    //check if a user was returned
    if (!returnedUser) {
      console.log('no user returned in login dispatch. returned payload is: ', loginDisp.payload);
      setLoading(false);
      return false;
    }
    if (!returnedUser.id) {
      console.error('no id on user returned from login dispatch. returned payload is: ', loginDisp.payload);
      setLoading(false);
      return false;
    }

    //register for notifications
    await registerForPushNotificationsAsync();

    //navigate further depending on situation
    if (!returnedUser.displayName || returnedUser.displayName == "") {
      setNewPlayer(true);
    }
    else if (startRoomId) {
      navigate('Game', { roomId: startRoomId });
    }
    else {
      navigate('Menu');
    }
    setLoading(false);
    return true;
  }

  //start effect
  const startEffect = async () => {

    await requestNotificationPermission();
    await tryLoginStart();

  }
  useEffect(() => { startEffect() }, []);

  return (
    <ImageBackground source={background} resizeMode='cover' style={{
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      padding: 30,
      textAlign: 'center',
    }}>

      {loading ?

        <Text style={[styles.paragraph, textColors2.white]}>...</Text>
        :
        <>
          {newPlayer ?
            <UserNameField />
            :
            <>
              <Text style={[styles.title, { color: colors.white }]}>Unwritten</Text>
              <Text style={[styles.paragraph, styles.textCenter, styles.bold, textColors.white]}>Tell stories together</Text>
              {Space(15)}
              <AuthButton tryLogin={tryLogin} />
            </>
          }
        </>

      }

    </ImageBackground >
  );
}