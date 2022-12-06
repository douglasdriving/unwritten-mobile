import { useEffect } from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import { styles, colors } from "../../style";

export const MyButton = (props) => {

  const { disabled, onPress, color, textColor, flex } = props;

  // useEffect(() => { console.log('text colors: ', textColor) }, []);

  const handlePress = () => {
    if (disabled) return;
    onPress();
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{
        // borderWidth: 2,
        // borderColor: colors.white,
        backgroundColor: (color || colors.light),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        // margin: 5,
        flex: (flex ? 1 : null),
        opacity: disabled ? 0.4 : 1,
        height: props.height
      }}>
        <Text
          style={[styles.h3, {
            textAlign: 'center',
            color: (textColor || colors.white),
          }]}
        >
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback >
  );
}