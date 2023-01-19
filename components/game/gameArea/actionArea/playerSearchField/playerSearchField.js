import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, styles } from "../../../../../style";
import { useSelector } from "react-redux";
import { selectActivePlayerCount } from "../../../../../redux/roomSlice";

export const PlayerSearchField = () => {

  const playerCount = useSelector(selectActivePlayerCount);

  return (
    <View style={styles.actionBox}>
      <Icon name="bonfire" size={50} style={{ margin: 10, textAlign: 'center' }} color={colors.fire} />
      <Text style={[styles.paragraph, styles.textCenter, { color: colors.white }]}>
        Waiting for someone to join the camp and continue the story.
        You are currently {playerCount} people in this camp.
        When 4 people have joined, the storytelling rotation will start.
      </Text>
    </View>
  );
}