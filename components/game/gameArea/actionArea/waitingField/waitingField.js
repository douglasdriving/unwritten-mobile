import { View, Text } from "react-native";
import { styles } from "../../../../../style";
import { TimeToHms } from "../../../../../helpers/helpers";

export const WaitingField = (props) => {
  
  return(

    <View>

      <Text style={styles.h1}>Waiting...</Text>
      <Text>It's {props.nextPlayerName}'s turn to write</Text>
      <Text>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>

    </View>

  );

}