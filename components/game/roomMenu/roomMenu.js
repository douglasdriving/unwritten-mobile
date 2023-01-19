import { View, Text, Modal, TouchableWithoutFeedback } from "react-native"
import { colors, styles } from "../../../style";
import { CloseButton } from "../../smart/closeButton";
import { PlayerList } from "./playerList";
import { Space } from "../../smart/visuals";
import { useSelector } from "react-redux";
import { selectTitle, selectScenarioCount } from "../../../redux/roomSlice";

export const RoomMenu = (props) => {

  const title = useSelector(selectTitle);
  const scenarioCount = useSelector(selectScenarioCount);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={props.closeMenu}>
        <View style={styles.cover} />
      </TouchableWithoutFeedback>
      <View style={styles.roomMenu}>
        <CloseButton handlePress={props.closeMenu} />
        {Space(20)}
        <View style={{ padding: 20 }}>
          <Text style={styles.h1}>{title}</Text>
          <Text style={[styles.paragraph, { color: colors.white }]}>{scenarioCount} / 40 turns taken</Text>
          <PlayerList {...props} />
        </View>

      </View>
    </Modal >
  );

}