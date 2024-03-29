import { Text, View } from 'react-native';
import { styles, textColors } from '../../../../style';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName, logout } from '../../../../redux/userSlice';
import { MyButton } from '../../../smart/myButton';
import { navigate } from '../../../../contexts/rootNavigation';
import { CampList } from '../camps/campList/campList';
import { GetMyRoomsAsSingleList } from '../../../../backend/backendFake';
import { Space } from '../../../smart/visuals';
import { PlayerStats } from './playerStats/playerStats';

export const Profile = () => {

  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    navigate('Welcome');
  }

  return (
    <>

      <Text style={[styles.h1, textColors.white]}>{userName}</Text>

      <PlayerStats />

      {/* <CampList
        title='My Camps'
        roomQuery={GetMyRoomsAsSingleList}
        joinButtonText='Enter ->'
        alternativeText='You are not part of any camps yet. Find one in the camps tab!'
      /> */}

      {Space(20)}

      <MyButton title='Sign Out' onPress={signOut} />

    </>

  );
}