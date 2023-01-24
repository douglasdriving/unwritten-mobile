import { Text, ScrollView } from 'react-native';
import { styles } from '../../../../style';
import { GetAvailableRoomsAsSingleList, GetOngoingCamps, GetFinishedStories } from '../../../../backend/backendCalls';
import { useState, useEffect } from 'react';
import { Popup } from '../../../smart/popup';
import { navigate } from '../../../../contexts/rootNavigation';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/userSlice';
import { CampList } from './campList/campList';

export const Camps = () => {

  const [welcomPopup, setWelcomePopup] = useState();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) console.error('no user found in the redux store');
  })

  return (
    <ScrollView style={styles.menuPageContainer}>
      {welcomPopup &&
        <Popup
          title='Welcome to Unwritten!'
          text='As a free user, you can join 2 rooms to write stories,
          and access the library of finished stories. Start by joining a room!
          If you want to play unlimited stories and create your own,
          consider joining Unwritten'
          onClose={() => { setWelcomePopup(false) }}
          buttons={[
            {
              title: 'Join Unwritten',
              handlePress: () => { navigate('Join') }
            },
          ]}
        />
      }

      <Text style={styles.h1}>Camps</Text>

      <CampList
        title='Kindling'
        description='New camps looking for players to join. Sit down to join the storytelling!'
        confirmJoinRequired={false}
        roomQuery={GetAvailableRoomsAsSingleList}
        joinButtonText='Join Camp ->'
        alternativeText='No Camps are currently available. You can create your own in the next tab.'
      />

      <CampList
        title='Burning'
        description='Full camps where players are currently telling a story. Sit down to listen!'
        confirmJoinRequired={false}
        roomQuery={GetOngoingCamps}
        joinButtonText='Join and listen ->'
        alternativeText='There are no ongoing camps to listen in on right now.'
      />

      <CampList
        title='Finished'
        description='Finished camps with a full story. Sit down to read it'
        confirmJoinRequired={false}
        roomQuery={GetFinishedStories}
        joinButtonText='Read Story ->'
        alternativeText='No stories have yet been finished in Unwritten'
        hideIfEmpty
      />

    </ScrollView>
  );
}