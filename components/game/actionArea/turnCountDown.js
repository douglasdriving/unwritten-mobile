import { Text } from "react-native";

export const TurnCountDown = (props) => {

  const timeLeft = '13h 43min 22s';
  let textPrint = '⏳' + timeLeft;
  if (props.full) textPrint += ' until turn passes';

  return(
    <Text>{textPrint}</Text>
  );
}