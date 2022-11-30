import { TouchableWithoutFeedback, Text } from "react-native";

export const BoolStateToggler = (props) => {

  const toggleState = () => {
    props.setState(!props.state)
  }

  return (
    <TouchableWithoutFeedback>
      <Text
        onPress={toggleState}
        style={{ textDecorationLine: 'underline', textAlign: 'center', padding: 10 }}
      >
        {props.state ? props.onText : props.offText}
      </Text>
    </TouchableWithoutFeedback>
  );

}