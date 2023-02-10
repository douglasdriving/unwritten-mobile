import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { colors2, gameStyle, styles, textColors2 } from "../../../../../style";

export const WaitingForOtherNodeField = () => {


  return (
    <View style={gameStyle.actionBox}>

      <Icon
        name="bonfire"
        size={50}
        style={{ margin: 10, textAlign: 'center' }}
        color={colors2.light}
      />

      <Text style={[styles.paragraph, styles.textCenter, textColors2.white]}>
        You added the last part of the story and must wait for someone else to continue before you can add again
      </Text>

    </View>
  );
}