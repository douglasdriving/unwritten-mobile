import { useContext, useEffect } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { AuthTokenContext } from "../../../contexts/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../../style";

export const MenuScreenHeader = (props) => {

  const [authToken, setAuthToken] = useContext(AuthTokenContext);
  const {user} = props;

  const signOut = () =>{
    setAuthToken('');
    AsyncStorage.setItem('authToken', '');
    props.navigation.navigate('Welcome');
  }

  useEffect(() => {
    if(!authToken || !user){
      signOut();
    }
  }, [user, authToken])

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white', width: '100%', paddingTop: 40, padding: 20, justifyContent: 'center'}}>
      <Text style={{...styles.paragraph, ...styles.textCenter}}>Signed in as {user.name}. </Text>
      <TouchableWithoutFeedback onPress={signOut}>
        <Text style={{ textDecorationLine: 'underline', ...styles.body }}>Sign Out</Text>
      </TouchableWithoutFeedback>
    </View>
  )
};