import { View, Text} from "react-native"
import { styles } from "../../../style";
import { PlayerList } from "./playerList";
import { CloseButton } from "../../closeButton";

export const RoomMenu = () => {
  return(
    <View style={styles.roomMenu}>
      <CloseButton/>
      <Text style={styles.h1}>Room</Text>
      <Text>The Little Red Riding Hood</Text>
      <Text>14 / 40 turns taken</Text>
      <PlayerList/>
    </View>
  );
}