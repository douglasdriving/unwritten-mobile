import { Text } from 'react-native';
import { styles, textColors2 } from '../../../../style';
import { GetAvailableRoomsAsSingleList, GetMyRoomsAsSingleList } from '../../../../backend/backendCalls';
import { styles } from '../../../../style';
import { GetAvailableRoomsAsSingleList } from '../../../../backend/backendFake';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/userSlice';
import { CampList } from './campList/campList';

export const Camps = () => {

  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) console.error('no user found in the redux store');
  })

  return (
    <>

      <Text style={[styles.h1]}>Camps</Text>

      <Text style={[styles.paragraph, textColors2.white]}>Enter a camp to participate in the storytelling</Text>

      <CampList
        title='My Camps'
        roomQuery={GetMyRoomsAsSingleList}
        joinButtonText='Enter ->'
        alternativeText='You are not part of any camps yet. Find one in the camps tab!'
        confirmJoinRequired={false}
      />

      <CampList
        title='Active'
        roomQuery={GetAvailableRoomsAsSingleList}
        joinButtonText='Enter ->'
        alternativeText='No open camps are currently available. You can create your own in the next tab.'
        confirmJoinRequired={false}
      />

    </>
  );
}