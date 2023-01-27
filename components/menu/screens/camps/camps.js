import { Text, View } from 'react-native';
import { styles } from '../../../../style';
import { GetAvailableRoomsAsSingleList, GetOngoingCamps, GetFinishedStories } from '../../../../backend/backendCalls';
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

      <Text style={styles.h1}>Camps</Text>

      <CampList
        title='Kindling'
        description='New camps looking for players to join. Sit down to join the storytelling!'
        confirmJoinRequired={true}
        roomQuery={GetAvailableRoomsAsSingleList}
        joinButtonText='Participate ->'
        alternativeText='No Camps are currently available. You can create your own in the next tab.'
      />

      <CampList
        title='Burning'
        description='Full camps where players are currently telling a story. Sit down to listen!'
        confirmJoinRequired={false}
        roomQuery={GetOngoingCamps}
        joinButtonText='Listen ->'
        alternativeText='There are no ongoing camps to listen in on right now.'
      />

      <CampList
        title='Finished'
        description='Finished camps with a full story. Sit down to read it'
        confirmJoinRequired={false}
        roomQuery={GetFinishedStories}
        joinButtonText='Read ->'
        alternativeText='No stories have yet been finished in Unwritten'
        hideIfEmpty
      />

    </View>
  );
}