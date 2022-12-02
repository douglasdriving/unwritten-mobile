import { useEffect } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { styles } from "../../../style";
import { navigate } from "../../../contexts/rootNavigation";

//redux imports
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from "../../../redux/userSlice";

export const MenuScreenHeader = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signOut = () => {
    dispatch(logout());
    navigate('Welcome');
  }

  useEffect(() => {
    if (!user) {
      signOut();
    }
  }, [user])

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', width: '100%', paddingTop: 40, padding: 20, justifyContent: 'center' }}>
      <Text style={{ ...styles.paragraph, ...styles.textCenter }}>Signed in as {user.name}. </Text>
      <TouchableWithoutFeedback onPress={signOut}>
        <Text style={{ textDecorationLine: 'underline', ...styles.body }}>Sign Out</Text>
      </TouchableWithoutFeedback>
    </View>
  )
};