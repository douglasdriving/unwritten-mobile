import { Text, View } from 'react-native';
import { styles } from '../../../../style';
import { GetAvailableRoomsAsSingleList, GetFinishedStories } from '../../../../backend/backendCalls';
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
    <View style={styles.menuPageContainer}>

      <Text style={[styles.h1]}>Camps</Text>

      <CampList
        title='Open'
        description='Open camps with ongoing stories. Sit down to participate!'
        roomQuery={GetAvailableRoomsAsSingleList}
        joinButtonText='Enter ->'
        alternativeText='No open camps are currently available. You can create your own in the next tab.'
      />

      <CampList
        title='Closed'
        description='Closed camps with finished stories. Enter one to read it!'
        roomQuery={GetFinishedStories}
        joinButtonText='Enter ->'
        hideIfEmpty
      />

    </View>
  );
}