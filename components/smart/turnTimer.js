import { View, Text } from "react-native";
import { styles, colors } from "../../style";
import { TimeToHms } from "../../helpers/helpers";
import { useSelector } from "react-redux";
import { selectTurnDeadline } from "../../redux/roomSlice";
import { useState } from "react";
import { useEffect } from "react";

export const TurnTimer = (props) => {

  const turnDeadline = useSelector(selectTurnDeadline);
  const [timeLeft, setTimeLeft] = useState(0);
  const [counterInterval, setCounterInterval] = useState(null);

  const setTime = () => {

    let time = new Date(turnDeadline).getTime() - new Date().getTime();
    if (time < 0) time = 0;
    setTimeLeft(time);

  }

  useEffect(() => {

    if (counterInterval) {
      clearInterval(counterInterval);
      setCounterInterval(null);
    }

    setTime();
    const interval = setInterval(setTime, 1000);
    setCounterInterval(interval);

  }, [])

  return (
    <Text style={[styles.paragraph, { color: props.color || colors.white }]}>⏳ {TimeToHms(timeLeft)}</Text>
  );

}