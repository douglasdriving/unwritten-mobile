import { ScrollView, Text, View, Modal } from 'react-native';
import { useState } from 'react';
import { styles, colors, appDimensions } from '../../../style';
import { MyButton } from '../../smart/myButton';
import { Space } from '../../smart/visuals';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const GameTutorial = (props) => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { close } = props;

  const closeTutorial = () => {
    if (toggleCheckBox) AsyncStorage.setItem('hideCampTutorial', 'hide');
    else AsyncStorage.setItem('hideCampTutorial', 'show');
    close();
  }

  const loadCheckboxState = async () => {

    const state = await AsyncStorage.getItem('hideCampTutorial');
    if (state == 'hide') setToggleCheckBox(true);
    else setToggleCheckBox(false);

  }

  useEffect(() => { loadCheckboxState(); }, []);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.cover} />
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        // backgroundColor: colors.black,
        // opacity: 0.6,
      }}>
        <ScrollView style={{
          padding: 20,
          backgroundColor: colors.white,
          borderRadius: appDimensions.borderRadius,
          width: '100%'
        }}>
          <Text style={{ fontSize: 50, marginBottom: 10, textAlign: 'center' }}>🏕️</Text>
          <Text style={styles.h2}>Welcome to the Campfire!</Text>
          <Text style={styles.paragraph}>This is where the storytelling takes place. It works like this:</Text>
          <View style={{
            // borderWidth: 1,
            padding: 15,
            marginBottom: 10,
          }}>
            <Text style={styles.paragraph}>🧑 Any player can add a piece to the story</Text>
            <Text style={styles.paragraph}>⌛ When a player decides to add something, they get 20 minutes before the story is unlocked for everyone</Text>
            <Text style={styles.paragraph}>📝 The same player can only add 1 piece at a time</Text>
            <Text style={styles.paragraph}>✍️ After 30 contributions have been made, anyone can choose to end the story</Text>
            <Text style={styles.paragraph}>🛑 Contribution number 40 will end the story automatically</Text>
          </View>
          <Text style={styles.paragraph}>Start by reading what people have written so far. If you want to join the storytelling, feel free to add your own piece to the story!</Text>
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            alignItems: 'center',
          }}>
            <CheckBox
              style={{ marginRight: 10 }}
              value={toggleCheckBox}
              onValueChange={v => setToggleCheckBox(v)}
            />
            <Text style={[styles.paragraph, { width: '80%' }]}>Hide instructions on camp open (You can always find them again in the camp menu)</Text>
          </View>
          <MyButton title='Start Camping!' onPress={closeTutorial} />
          {Space(50)}
        </ScrollView>
      </View>

    </Modal>

  )

}