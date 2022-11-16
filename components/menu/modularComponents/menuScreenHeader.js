import { useContext } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { AuthTokenContext } from "../../../contexts/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MenuScreenHeader = (props) => {

  const [authToken, setAuthToken] = useContext(AuthTokenContext);

  const signOut = () =>{
    setAuthToken('');
    AsyncStorage.setItem('authToken', '');
    props.navigation.navigate('Welcome');
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>Signed in as {props.user.name}. </Text>
      <TouchableWithoutFeedback onPress={signOut}>
        <Text style={{ textDecorationLine: 'underline' }}>Sign Out</Text>
      </TouchableWithoutFeedback>
    </View>
  )
};