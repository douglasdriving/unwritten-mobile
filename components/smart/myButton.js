import { TouchableWithoutFeedback, View, Text } from "react-native";
import { styles } from "../../style";

export const MyButton = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={{
        borderWidth: 2,
        backgroundColor: "lightgrey",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        margin: 5,
        flex: 1
      }}>
        <Text style={{...styles.h3, textAlign: 'center'}}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback >
  );
}