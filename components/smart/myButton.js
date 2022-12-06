import { TouchableWithoutFeedback, View, Text } from "react-native";
import { styles } from "../../style";

export const MyButton = (props) => {

  const {disabled, onPress} = props;

  const handlePress = () => {
    if(disabled) return;
    onPress();
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{
        borderWidth: 2,
        backgroundColor: props.color,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        // margin: 5,
        flex: 1,
        opacity: disabled ? 0.4 : 1,
        height: props.height
      }}>
        <Text style={{...styles.h3, textAlign: 'center'}}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback >
  );
}