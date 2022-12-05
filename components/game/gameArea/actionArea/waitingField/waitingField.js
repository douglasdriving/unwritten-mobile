import { View, Text } from "react-native";
import { styles } from "../../../../../style";
import { TimeToHms } from "../../../../../helpers/helpers";
import { Space } from "../../../../smart/visuals";

export const WaitingField = (props) => {

  return (

    <View>
      
      {Space(10)}
      <Text style={styles.h3}>It's {props.nextPlayerName}'s turn to write</Text>
      {Space(10)}
      <Text style={styles.paragraph}>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>

    </View>

  );

}