import { TouchableWithoutFeedback, Text } from "react-native";
import { styles } from "../../../style";

export const BoolStateToggler = (props) => {

  const {color} = props;

  const toggleState = () => {
    props.setState(!props.state)
  }

  return (
    <TouchableWithoutFeedback>
      <Text
        onPress={toggleState}
        style={{ ...styles.paragraph, textDecorationLine: 'underline', textAlign: 'center', padding: 10, color: color }}
      >
        {props.state ? props.onText : props.offText}
      </Text>
    </TouchableWithoutFeedback>
  );

}