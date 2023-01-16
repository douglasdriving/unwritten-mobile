import { View, Text } from "react-native";
import { styles } from "../../../../../style";
// import { TimeToHms } from "../../../../../helpers/helpers";
// import { useSelector } from "react-redux";
// import { selectTurnDeadline } from "../../../../../redux/roomSlice";
// import { useState } from "react";
// import { useEffect } from "react";
import { TurnTimer } from "../../../../smart/turnTimer";

export const WaitingField = (props) => {

  // const turnDeadline = useSelector(selectTurnDeadline);
  // const [timeLeft, setTimeLeft] = useState(0);
  // const [counterInterval, setCounterInterval] = useState(null);

  // const setTime = () => {

  //   const time = new Date(turnDeadline).getTime() - new Date().getTime();
  //   if (time < 0) time = 0;
  //   setTimeLeft(time);

  // }

  // useEffect(() => {

  //   if (counterInterval) {
  //     clearInterval(counterInterval);
  //     setCounterInterval(null);
  //   }

  //   setTime();
  //   const interval = setInterval(setTime, 1000);
  //   setCounterInterval(interval);

  // }, [])

  return (
    <View style={styles.actionBox}>
      <Text style={styles.h3}>It's {props.nextPlayerName}'s turn to write</Text>
      <TurnTimer/>
    </View>
  );

}