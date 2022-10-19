import { View, Text, Button } from "react-native";
import { styles } from "../../../../style";
import { Divider } from "../../../visuals";
import { Actions } from "./actions";
import { TurnCountDown } from "../turnCountDown";

export const YourTurnField = (props) => {
  return (
    <View>
      <Divider />
      <Text style={styles.h1}>Your turn to write!</Text>
      <Text>You got 500 new characters! You now have {props.charsRemaining} characters to write with.</Text>
      <Actions/>
      <TurnCountDown full={true}/>
    </View>
  );
}