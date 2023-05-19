import { Text } from 'react-native';
import { styles, textColors2 } from '../../../../style';
import { GetFinishedStories } from '../../../../backend/backendCalls';
import { Text } from 'react-native';
import { styles, textColors2 } from '../../../../style';
import { GetFinishedStories } from '../../../../backend/backendFake';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/userSlice';
import { CampList } from '../camps/campList/campList';

export const Archive = () => {

  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) console.error('no user found in the redux store');
  })

  return (
    <>

      <Text style={[styles.h1]}>Archive</Text>

      <Text style={[styles.paragraph, textColors2.white]}>Stories finished in prior camps</Text>

      <CampList
        // title='Closed'
        // description='Closed camps with finished stories. Enter one to read it!'
        roomQuery={GetFinishedStories}
        joinButtonText='Enter ->'
        alternativeText='Seems like there are still no finished stories in Unwritten. Help make the first one!'
      />

    </>
  );
}