import { Text, View } from 'react-native';
import { styles, textColors, colors } from '../../../../style';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName, logout } from '../../../../redux/userSlice';
import { MyButton } from '../../../smart/myButton';
import { navigate } from '../../../../contexts/rootNavigation';
import { CampList } from '../camps/campList/campList';
import { GetMyRoomsAsSingleList } from '../../../../backend/backendCalls';

export const Profile = () => {

  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    navigate('Welcome');
  }

  return (
    <View style={styles.menuPageContainer}>
      <Text style={[styles.h3, textColors.white]}>Signed in as {userName}</Text>
      <MyButton title='Sign Out' onPress={signOut} />
      <CampList
        title='Camps'
        description='Camps I am participating in'
        confirmJoinRequired={false}
        roomQuery={GetMyRoomsAsSingleList}
        joinButtonText='Enter ->'
        alternativeText='You are not part of any camps yet. Find one in the camps tab!'
      />
    </View>

  );
}