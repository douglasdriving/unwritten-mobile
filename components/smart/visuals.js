import { View } from "react-native";
import { colors } from "../../style";

export const Divider = (props) => {

  const { color } = props;

  return (
    <View
      style={{
        borderBottomColor: (color || colors.dark),
        borderBottomWidth: 1,
      }}
    />
  );
}

export const Space = (height) => {
  return (
    <View
      style={{
        height: height,
      }}
    />
  );
}
