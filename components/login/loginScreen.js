import { ImageBackground } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { navigate } from '../../contexts/rootNavigation.js';
import background from '../../assets/background/campfireBackground.png';
import { WelcomeScreenField } from './welcomeScreenField/welcomeScreenField.js';
import { SignInForm } from './signInForm/signInForm';

//redux imports
import { useDispatch } from 'react-redux';
import { login, loadLocalToken } from '../../redux/userSlice.js';

export const LoginScreen = ({startRoomId}) => {

  //redux
  const dispatch = useDispatch();

  //page display
  const [showForm, setShowForm] = useState(false);

  //login functions
  const tryLoginStart = async () => {

    //try loading a token and use it to login
    const tokenInStorage = await tryLoadTokenFromStorage();
    if (!tokenInStorage || tokenInStorage == '') return;
    const gotUser = await tryLogin();
    return gotUser;

  }
  const tryLoadTokenFromStorage = async () => {

    //try loading an auth token from the local phone storage
    const token = await dispatch(loadLocalToken());
    return (token.payload);

  }
  const tryLogin = async () => {

    //try using the auth token to login
    const loginDisp = await dispatch(login());
    const returnedUser = loginDisp.payload;

    if (!returnedUser) {
      console.error('no user returned in login dispatch. returned payload is: ', loginDisp.payload);
      return false;
    }
    if (!returnedUser.id) {
      console.error('no id on user returned from login dispatch. returned payload is: ', loginDisp.payload);
      return false;
    }

    if (startRoomId) {
      navigate('Game', { roomId: startRoomId });
    }
    else {
      navigate('Menu');
    }
    return true;

  }

  //update page
  useEffect(() => { tryLoginStart() }, []);

  return (
    <ImageBackground source={background} resizeMode='cover' style={{
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      padding: 30,
      textAlign: 'center',
    }}>

      {!showForm &&
        <WelcomeScreenField
          onButtonPress={() => { setShowForm(true); }}
        />
      }

      {showForm &&
        <SignInForm tryLogin={tryLogin} />
      }

    </ImageBackground >
  );
}