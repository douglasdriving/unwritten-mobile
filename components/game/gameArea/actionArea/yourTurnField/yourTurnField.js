import { View, Text } from "react-native";
import { styles, textColors } from "../../../../../style";
import { TimeToHms } from "../../../../../helpers/helpers";
import { Space } from "../../../../smart/visuals";
import { Actions } from "./actions";

export const YourTurnField = (props) => {

  return (
    <>
      <View style={styles.actionBox}>
        {Space(5)}
        <Text style={styles.h1}>Your turn!</Text>
        <Text style={[styles.paragraph, textColors.white]}>You got 500 new characters to write with</Text>
        <Actions {...props} />
      </View>
      {Space(20)}
      <Text style={[styles.paragraph, styles.textCenter, textColors.dark]}>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>
    </>
  );
}