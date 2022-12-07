import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, styles } from "../../../../../style";

export const PlayerSearchField = () => {
  return (
    <View style={styles.actionBox}>
      <Icon name="bonfire" size={50} style={{margin: 10, textAlign: 'center'}} color={colors.fire} />
      <Text style={[styles.paragraph, styles.textCenter, {color: colors.white}]}>
        Waiting for players to join the camp and continue the story.
      </Text>
    </View>
  );
}