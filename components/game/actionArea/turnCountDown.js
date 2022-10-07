import { Text } from "react-native";

export const TurnCountDown = () => {

  const timeLeft = '13h 43min 22s';

  return(
    <Text>⏳ {timeLeft} until turn passes</Text>
  );
}