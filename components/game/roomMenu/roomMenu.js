import { View, Text, Modal, TouchableWithoutFeedback } from "react-native"
import { colors2, styles, textColors2 } from "../../../style";
import { CloseButton } from "../../smart/closeButton";
import { PlayerList } from "./playerList";
import { Space } from "../../smart/visuals";
import { useSelector } from "react-redux";
import { selectTitle, selectScenarioCount } from "../../../redux/roomSlice";
import { MyButton } from "../../smart/myButton";

export const RoomMenu = (props) => {

  const title = useSelector(selectTitle);
  const scenarioCount = useSelector(selectScenarioCount);
  const { openTutorial, closeMenu } = props;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.cover} />
      </TouchableWithoutFeedback>
      <View style={styles.roomMenu}>
        <CloseButton handlePress={closeMenu} />
        {Space(20)}
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 50, marginBottom: 10, textAlign: 'center' }}>🏕️</Text>
          <Text style={[styles.h1, styles.textCenter, textColors2.night]}>{title}</Text>
          <Text style={[styles.paragraph, { color: colors2.night, textAlign: 'center' }]}>📝 Paragraphs: {scenarioCount} / 40</Text>
          <PlayerList />
          {Space(10)}
          <MyButton title='Instructions' onPress={openTutorial} color={colors2.red} textColor={colors2.white} />
        </View>
      </View>
    </Modal >
  );

}