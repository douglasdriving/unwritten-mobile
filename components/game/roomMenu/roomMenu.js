import { View, Text, Modal, TouchableWithoutFeedback } from "react-native"
import { colors, styles } from "../../../style";
import { CloseButton } from "../../smart/closeButton";
import { PlayerList } from "./playerList";
import { Space } from "../../smart/visuals";

export const RoomMenu = (props) => {

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
          <Text style={styles.h1}>{props.storyTitle}</Text>
          <Text style={[styles.paragraph, { color: colors.white }]}>{props.turnsTaken} / 40 turns taken</Text>
          <PlayerList {...props} />
        </View>

      </View>
    </Modal >
  );

}