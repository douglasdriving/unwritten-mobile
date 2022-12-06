import { View, Text } from "react-native";
import { styles } from "../../../../../style";
import { TimeToHms } from "../../../../../helpers/helpers";

export const WaitingField = (props) => {

  return (
    <View style={styles.actionBox}>
      <Text style={styles.h3}>It's {props.nextPlayerName}'s turn to write</Text>
      <Text style={styles.paragraph}>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>
    </View>
  );

}