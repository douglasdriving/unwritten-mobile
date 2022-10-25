import { View, Text } from "react-native";
import { styles } from "../../../../../style";
import { TimeToHms } from "../../../../../helpers/helpers";
import { Divider } from "../../../../smart/visuals";
import { Actions } from "./actions";

export const YourTurnField = (props) => {
  return (
    <View>
      <Divider />
      <Text style={styles.h1}>Your turn to write!</Text>
      <Text>You got 500 new characters! You now have {props.charsRemaining} characters to write with.</Text>
      <Actions {...props} />
      <Text>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>
    </View>
  );
}