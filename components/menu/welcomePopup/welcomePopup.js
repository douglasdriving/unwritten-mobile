import { ScrollView, Text, View, Modal } from 'react-native';
import { useState } from 'react';
import { styles, colors, textColors, colors2, appDimensions, textColors2 } from '../../../style';
import { MyButton } from '../../smart/myButton';
import { Space } from '../../smart/visuals';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const WelcomePopup = (props) => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { close } = props;

  const closeTutorial = () => {
    if (toggleCheckBox) AsyncStorage.setItem('hideWelcomePopup', 'hide');
    else AsyncStorage.setItem('hideWelcomePopup', 'show');
    close();
  }

  const loadCheckboxState = async () => {

    const state = await AsyncStorage.getItem('hideWelcomePopup');
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
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
        <ScrollView style={{
          padding: 20,
          backgroundColor: colors2.light,
          width: '100%',
          borderRadius: appDimensions.borderRadius,
          alignSelf: 'center',
        }}>
          <Ionicon
            name="bonfire"
            size={70}
            color={colors2.red}
            style={{ margin: 20, textAlign: 'center' }}
          />
          <Text style={[styles.paragraph, textColors2.dark]}>
            Hello and a warm welcome to Unwritten!
          </Text>
          <Text style={[styles.paragraph, textColors2.dark]}>
            This is a storytelling place where you sit down at different camps to tell stories with others.
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="campground"
              size={25}
              color={colors2.red}
              style={{ width: '15%', textAlign: 'center', textAlignVertical: 'center', marginRight: 5 }}
            />
            <Text style={[styles.paragraph, textColors2.dark, { width: '80%' }]}>
              Visit the camp tab to join a camp or listen in on others.
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name="fire"
              size={42}
              color={colors2.red}
              style={{ width: '15%', textAlign: 'center', textAlignVertical: 'center', marginRight: 5 }}
            />
            <Text style={[styles.paragraph, textColors2.dark, { width: '80%' }]}>
              To create your own camp and start a new story, visit the kindle tab.
            </Text>
          </View>

          <Text style={[styles.paragraph, textColors2.dark]}>
            I hope you will enjoy your time here. Good luck!
          </Text>

          <Text style={[styles.paragraph, textColors2.dark]}>
            /Douglas, creator of Unwritten
          </Text>


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
            <Text style={[styles.paragraph, textColors2.dark, { width: '80%' }]}>Hide instructions on camp open (You can always find them again in the camp menu)</Text>
          </View>
          <MyButton title='Close Intro' onPress={closeTutorial} color={colors2.moss} textColor={colors2.light}/>
        </ScrollView>
      </View>

    </Modal>

  )

}