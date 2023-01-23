import { View, Text, Modal, TouchableWithoutFeedback } from "react-native"
import { colors, styles, textColors } from "../../../style";
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
        <View style={{ padding: 20 }}>
          <Text style={styles.h1}>{title}</Text>
          <Text style={[styles.paragraph, { color: colors.white }]}>{scenarioCount} / 40 turns taken</Text>
          <PlayerList />
          {Space(10)}
          <MyButton title='ℹ️ Camp Instructions' onPress={openTutorial} color={colors.fire} textColor={colors.dark}/>
        </View>
      </View>
    </Modal >
  );

}