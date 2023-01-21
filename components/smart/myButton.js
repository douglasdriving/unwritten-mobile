import { useEffect } from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import { styles, colors } from "../../style";

export const MyButton = (props) => {

  const { disabled, onPress, color, textColor, flex, title, height } = props;

  const handlePress = () => {
    if (disabled) return;
    onPress();
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{
        backgroundColor: (color || colors.light),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        flex: (flex ? 1 : null),
        opacity: disabled ? 0.4 : 1,
        height: height
      }}>
        <Text
          style={[styles.h3, {
            textAlign: 'center',
            color: (textColor || colors.white),
          }]}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback >
  );
}