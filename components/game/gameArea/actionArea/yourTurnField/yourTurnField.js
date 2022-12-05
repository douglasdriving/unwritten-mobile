import { View, Text } from "react-native";
import { styles } from "../../../../../style";
import { TimeToHms } from "../../../../../helpers/helpers";
import { Space } from "../../../../smart/visuals";
import { Actions } from "./actions";
import { FocusInputField } from "../../../../smart/focusInputField";
import { useState } from "react";

export const YourTurnField = (props) => {

  return (
    <>
      <View style={styles.actionBox}>
        {Space(5)}
        <Text style={styles.h1}>Your turn!</Text>
        <Text style={styles.paragraph}>You got 500 new characters to write with</Text>
        <Actions {...props} />
      </View>
      {Space(20)}
      <Text style={{...styles.paragraph, textAlign: 'center'}}>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>
    </>
  );
}