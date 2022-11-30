import { View } from "react-native";

export const Divider = () => {
  return (
    <View
      style={{
        borderBottomColor: 'black',
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
