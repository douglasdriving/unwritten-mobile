import { Text, View, ScrollView } from 'react-native';
import { styles, textColors, colors, colors2 } from '../../../../style';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName, logout } from '../../../../redux/userSlice';
import { MyButton } from '../../../smart/myButton';
import { navigate } from '../../../../contexts/rootNavigation';
import { CampList } from '../camps/campList/campList';
import { GetMyRoomsAsSingleList } from '../../../../backend/backendCalls';
import { Divider, Space } from '../../../smart/visuals';

export const Profile = () => {

  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    navigate('Welcome');
  }

  return (
    <View style={styles.menuPageContainer}>

      <Text style={[styles.h1, textColors.white]}>{userName}</Text>
      <Text style={[styles.paragraph, textColors.white]}>Contributions: 46</Text>
      <Text style={[styles.paragraph, textColors.white]}>Camps: 3</Text>
      <Text style={[styles.paragraph, textColors.white]}>Finished Stories: 1</Text>

      <CampList
        title='My Camps'
        confirmJoinRequired={false}
        roomQuery={GetMyRoomsAsSingleList}
        joinButtonText='Enter ->'
        alternativeText='You are not part of any camps yet. Find one in the camps tab!'
      />

      {Space(20)}

      <MyButton title='Sign Out' onPress={signOut}/>

    </View>

  );
}