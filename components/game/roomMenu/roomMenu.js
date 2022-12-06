import { View, Text, Modal } from "react-native"
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
      <View style={styles.cover} />
      <View style={styles.roomMenu}>
        <CloseButton handlePress={props.closeMenu} />
        {Space(20)}
        <View style={{ padding: 20 }}>
          <Text style={styles.h1}>{props.storyTitle}</Text>
          {/* <Text style={[styles.paragraph, { color: colors.white }]}>{props.storyTitle}</Text> */}
          <Text style={[styles.paragraph, { color: colors.white }]}>{props.turnsTaken} / 40 turns taken</Text>
          <PlayerList {...props} />
        </View>
      </View>


    </Modal>
  );

}