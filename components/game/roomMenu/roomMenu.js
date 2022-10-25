import { View, Text } from "react-native"
import { styles } from "../../../style";
import { CloseButton } from "../../smart/closeButton";
import { PlayerList } from "./playerList";

export const RoomMenu = (props) => {

  return (
    <View style={styles.roomMenu}>

      <CloseButton handlePress={props.closeMenu} />
      <Text style={styles.h1}>Room</Text>
      <Text>{props.storyTitle}</Text>
      <Text>{props.turnsTaken} / 40 turns taken</Text>
      <PlayerList {...props} />

    </View>
  );

}