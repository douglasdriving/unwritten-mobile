import { View, Text } from "react-native";
import { styles, colors } from "../../style";
import { TimeToHms } from "../../helpers/helpers";
import { useSelector } from "react-redux";
import { selectTurnDeadline } from "../../redux/roomSlice";
import { useState } from "react";
import { useEffect } from "react";
import { GetRoomDeadline } from "../../backend/backendCalls";

export const TurnTimer = (props) => {

  // const turnDeadline = useSelector(selectTurnDeadline);
  const [turnDeadline, setTurnDeadline] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [counterInterval, setCounterInterval] = useState(null);

  const loadDeadline = async () => {

    if (!props.roomId) {
      console.error('no roomId passed down into turn timer props');
      return;
    }
    const deadline = await GetRoomDeadline(props.roomId);
    await setTurnDeadline(deadline);

  }

  const setTime = () => {

    let time = new Date(turnDeadline).getTime() - new Date().getTime();
    if (time < 0) time = 0;
    setTimeLeft(time);

  }

  const setupTimer = () => {

    if (counterInterval) {
      clearInterval(counterInterval);
      setCounterInterval(null);
    }

    setTime();
    const interval = setInterval(setTime, 1000);
    setCounterInterval(interval);

  }

  useEffect(() => { loadDeadline(); }, []);
  useEffect(setupTimer, [turnDeadline]);

  return (
    <Text style={[styles.paragraph, { color: props.color || colors.white }]}>⏳ {TimeToHms(timeLeft)}</Text>
  );

}