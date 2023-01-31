import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, colors2, gameStyle, styles, textColors2 } from "../../../../../style";
import { useSelector } from "react-redux";
import { selectActivePlayerCount } from "../../../../../redux/roomSlice";

export const PlayerSearchField = () => {

  const playerCount = useSelector(selectActivePlayerCount);

  return (
    <View style={gameStyle.actionBox}>

      <Icon
        name="bonfire"
        size={50}
        style={{ margin: 10, textAlign: 'center' }}
        color={colors2.light}
      />

      <Text style={[styles.paragraph, styles.textCenter, textColors2.white]}>
        Waiting for someone to join the camp and continue the story.
        You are currently {playerCount} people in this camp.
        When 4 people have joined, the storytelling rotation will start.
      </Text>

    </View>
  );
}