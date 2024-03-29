import { Text } from "react-native";
import { styles, colors } from "../../style";
import { addMinutes, convertGMTToLocalTime, TimeToHms } from "../../helpers/dateTimeFunctions";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLastNode, selectRoomId, loadRoomData } from "../../redux/roomSlice";

export const TurnTimer = (props) => {

  const [turnDeadline, setTurnDeadline] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [counterInterval, setCounterInterval] = useState(null);
  const lastNode = useSelector(selectLastNode)
  const dispatch = useDispatch();
  const { color, reloadOnZero } = props;
  const campId = useSelector(selectRoomId);

  const loadDeadline = () => {

    // const deadline = addMinutes(lastNode.created_at, 20);
    const deadline = addMinutes(new Date(), 20);
    setTurnDeadline(deadline);

  }

  const setTime = () => {

    //displays it incorrectly because of timezones
    let time = new Date(turnDeadline).getTime() - new Date().getTime();

    if (time < 0) {
      time = 0;
      if (reloadOnZero) dispatch(loadRoomData({ id: campId }));
    };

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

  useEffect(loadDeadline, [lastNode]);
  useEffect(setupTimer, [turnDeadline]);

  return (
    <Text style={[styles.paragraph, { color: color || colors.white }]}>
      ⏳ {TimeToHms(timeLeft)}
    </Text>
  );

}