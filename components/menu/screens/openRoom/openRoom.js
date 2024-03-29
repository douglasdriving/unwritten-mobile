import { Text, View, Button, TextInput } from 'react-native';
import { colors, colors2, styles } from '../../../../style';
import { useState, useEffect, useCallback } from 'react';
import { GetStoryKeys, CreateRoom } from '../../../../backend/backendFake';
import { Space } from '../../../smart/visuals';
import { Popup } from '../../../smart/popup';
import { useFocusEffect } from '@react-navigation/native';
import { ErrorText } from '../../modularComponents/errorText';
import { FocusInputField } from '../../../smart/focusInputField';
import { navigate, navigateToRoom } from '../../../../contexts/rootNavigation';
import { MyButton } from '../../../smart/myButton';
import { useDispatch } from 'react-redux';
import { loadRoomData } from '../../../../redux/roomSlice';

export const OpenRoom = () => {

  const dispatch = useDispatch();

  const [storyKeys, setStoryKeys] = useState();

  const [titleInput, setTitleInput] = useState();
  // const [descriptionInput, setDescriptionInput] = useState();
  const [startingScenario, setStartingScenario] = useState();

  const [tryingToOpen, setTryingToOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [roomCreateError, setRoomCreateError] = useState();

  const ToggleTryingToOpen = () => {
    setTryingToOpen(!tryingToOpen);
  }

  const StartOpening = async () => {

    setOpening(true);
    // const response = await CreateRoom(titleInput, descriptionInput, startingScenario);
    const response = await CreateRoom(titleInput, startingScenario);

    if (response.ok) {
      await dispatch(loadRoomData({ id: response.campId }));
      navigateToRoom(response.campId);
      ClearFields();
    }
    else {
      setRoomCreateError(response.message);
    }

    setOpening(false);

  }

  const LoadStoryKeys = async () => {
    const keys = await GetStoryKeys();
    setStoryKeys(keys);
    return;
  }

  const FieldsReady = () => {
    // return (titleInput && descriptionInput && startingScenario);
    return (titleInput && startingScenario);
  }

  const ClearFields = () => {
    // setDescriptionInput('');
    setStartingScenario('');
    setTitleInput('');
  }

  useFocusEffect(
    useCallback(() => {
      LoadStoryKeys();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      setRoomCreateError(null);
    }, [titleInput, startingScenario])
  );

  return (
    <>

      <Text style={styles.h1}>Start a Camp</Text>
      <Text style={[styles.paragraph, { color: colors2.white }]}>🪵  {storyKeys}</Text>

      <Text style={[styles.body, { color: colors2.white }]}>
        {
          storyKeys > 0 ?
            'Light a fire and open a storytelling camp for others to join' :
            'Lighting a fire requires firewood! Help finish other peoples stories to earn firewood.'
        }
      </Text>

      {
        (storyKeys > 0) &&
        <>
          {Space(10)}

          <FocusInputField
            label='Title'
            oneLine
            setText={text => { setTitleInput(text) }}
            placeholder={'Name your story'}
            text={titleInput}
          />
          {/* <FocusInputField
            label='Description'
            setText={text => { setDescriptionInput(text) }}
            placeholder={'Describe the story plot briefly'}
            flex={1}
            text={descriptionInput}
          /> */}
          <FocusInputField
            label='Opening'
            setText={text => { setStartingScenario(text) }}
            placeholder={'Start off the story with an opening paragraph'}
            flex={1}
            text={startingScenario}
          />
          {Space(15)}
          <MyButton
            title='🪵 Start Story Camp'
            disabled={!FieldsReady()}
            onPress={ToggleTryingToOpen}
            color={colors2.light}
            textColor={colors2.night}
          />
        </>
      }

      <ErrorText message={roomCreateError} />

      {tryingToOpen && <Popup
        title='Start the camp?'
        text={'Starting the camp will cost 1🪵. You currently have ' + storyKeys}
        onClose={ToggleTryingToOpen}
        buttons={[
          {
            title: 'Start 🪵',
            handlePress: (() => { ToggleTryingToOpen(); StartOpening() })
          }
        ]}
      />}

      {opening && <Popup
        title='🪵 Lighting fire...'
        loading={true}
      />}

    </>

  );

}