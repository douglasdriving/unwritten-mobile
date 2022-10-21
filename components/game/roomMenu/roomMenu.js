import { View, Text} from "react-native"
import { styles } from "../../../style";
import { PlayerList } from "./playerList";
import { CloseButton } from "../../closeButton";

export const RoomMenu = (props) => {

  return(
    <View style={styles.roomMenu}>

      <CloseButton handlePress={props.closeMenu}/>
      <Text style={styles.h1}>Room</Text>
      <Text>{props.storyTitle}</Text>
      <Text>{props.turnsTaken} / 40 turns taken</Text>
      <PlayerList
        players={props.players}
        nextPlayer={props.nextPlayer}
        timeLeftInTurn={props.timeLeftInTurn}
      />
      
    </View>
  );

}