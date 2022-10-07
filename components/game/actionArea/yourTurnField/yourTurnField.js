import { View, Text, Button } from "react-native";
import { styles } from "../../../../style";
import { Divider } from "../../../visuals";
import { CharUpdateText } from "./charUpdateText";
import { Actions } from "./actions";
import { TurnCountDown } from "../turnCountDown";

export const YourTurnField = () => {
  return (
    <View>
      <Divider />
      <Text style={styles.h1}>Your turn to write!</Text>
      <CharUpdateText />
      <Actions/>
      <TurnCountDown full={true}/>
    </View>
  );
}