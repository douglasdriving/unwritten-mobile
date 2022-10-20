import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../../style";
import { TurnCountDown } from "../turnCountDown";

export const WaitingField = (props) => {
  return(
    <View>
      <Text style={styles.h1}>Waiting...</Text>
      <Text>It's {props.nextPlayersName} turn</Text>
      <TurnCountDown full={true}/>
    </View>
  );
}