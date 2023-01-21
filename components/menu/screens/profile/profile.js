import { Text, View } from 'react-native';
import { styles, textColors, colors } from '../../../../style';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName, logout } from '../../../../redux/userSlice';
import { MyButton } from '../../../smart/myButton';
import { navigate } from '../../../../contexts/rootNavigation';

export const Profile = () => {

  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    navigate('Welcome');
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     //load on enter
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <Text style={[styles.h3, textColors.white]}>Signed in as {userName}</Text>
      <MyButton title='Sign Out' onPress={signOut}/>
    </View>

  );
}