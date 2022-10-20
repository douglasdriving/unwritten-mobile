import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { TurnCountDown } from "../turnCountDown";


export const PlayerSearchField = () => {
  return(
    <View>
      <Icon name="search-outline" size={40}/>
      <Text>Searching for another player to join the lobby and continue the story.</Text>
    </View>
  );
}