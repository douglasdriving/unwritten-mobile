import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, styles } from "../../../../../style";

export const PlayerSearchField = () => {
  return (
    <View style={styles.actionBox}>
      <Icon name="search-outline" size={40} style={{margin: 10, textAlign: 'center'}} color={colors.white} />
      <Text style={[styles.paragraph, styles.textCenter, {color: colors.white}]}>
        Searching for another player to join the lobby and continue the story.
      </Text>
    </View>
  );
}