import { ScrollView, Text, View, Modal } from 'react-native';
import { useState } from 'react';
import { styles, colors } from '../../../style';
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
            <Text style={styles.paragraph}>🧑 When 4 players have joined the camp, they will take turns to add to the story</Text>
            <Text style={styles.paragraph}>⌛ When it’s your turn to write, you have 48 hours to make your contribution</Text>
            <Text style={styles.paragraph}>❌ If you miss your turn, you will get a strike</Text>
            <Text style={styles.paragraph}>🚪 If you get 3 strikes, you will automatically leave the camp</Text>
            <Text style={styles.paragraph}>🔔 You will receive a notification every time it’s your turn (make sure your notifications are turned on!)</Text>
            <Text style={styles.paragraph}>✍️ After 30 turns, anyone can choose to end the story</Text>
            <Text style={styles.paragraph}>🛑 At turn 40, the story must be ended!</Text>
          </View>
          <Text style={styles.paragraph}>To participate in this camp, write something within the next 30 minutes (otherwise, you will leave the camp automatically).</Text>
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