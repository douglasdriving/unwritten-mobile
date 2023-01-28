import { useState, useEffect } from "react"
import { registerForPushNotificationsAsync } from "../../../backend/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { fetchTokenWithCredentials, createUserAndFetchToken } from "../../../redux/userSlice";
import { styles, colors } from "../../../style";
import { View } from "react-native";
import { MyButton } from "../../smart/myButton";
import { Space } from "../../smart/visuals";
import { ErrorText } from "../../menu/modularComponents/errorText";
import { LoadPopup } from "../../menu/modularComponents/loadPopup";
import { BoolStateToggler } from "../../menu/modularComponents/stateToggler";
import { SignInFormFields } from "./signInFormFields/signInFormFields";

export const SignInForm = ({ tryLogin }) => {

  const dispatch = useDispatch();

  //form fields
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [displayName, setDisplayName] = useState();

  //page display
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(true);

  const submitForm = async () => {

    //show load screen
    setLoading(signUp ? 'Creating new user...' : 'Signing in...');

    //fetch token with signup or signin
    if (signUp) {
      //check repeated pw
      if (password != repeatPassword) {
        setErrorMessage('passwords does not match');
        setLoading(false);
        return;
      }

      //create push token
      const pushToken = await registerForPushNotificationsAsync();
      AsyncStorage.setItem('pushToken', pushToken);

      //create user in backend
      await dispatch(createUserAndFetchToken({ email: userName, password, displayName, pushToken }));
    }
    else {
      const tokenFetchDisp = await dispatch(fetchTokenWithCredentials({ email: userName, password }));
    }

    const loggedIn = await tryLogin();

    //failed to login? Show error
    if (!loggedIn) {
      if (signUp) setErrorMessage('Failed to create user, please check your credentials'); //have to know why!!!!! backend will say...
      else setErrorMessage('Failed to login. Please check your credentials'); //have to know why!!! backend will say...
    }

    //hide load screen
    setLoading(false);

  }

  useEffect(() => { setErrorMessage(null) }, [userName, password, displayName, signUp])

  return (
    <View style={styles.formField}>

      <SignInFormFields
        signUp={signUp}
        setUserName={setUserName}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        setDisplayName={setDisplayName}
        submitForm={submitForm}
      />

      {Space(10)}

      <MyButton
        title={'Sign ' + (signUp ? 'Up' : 'In')}
        onPress={submitForm}
        disabled={!userName || !password || (signUp && !displayName)}
        color={colors.white}
        textColor={colors.light}
      />

      <ErrorText message={errorMessage} />

      <LoadPopup isLoading={loading != null && loading != ''} loadText={loading} />

      <BoolStateToggler
        setState={setSignUp}
        state={signUp}
        onText='Already have an account? Press here to sign in instead'
        offText='New to Unwritten? Sign up here'
        color={colors.white}
      />

    </View>
  )

}