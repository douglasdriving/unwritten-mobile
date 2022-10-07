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

export const Spacer = () => {
  return (
    <View
      style={{
        height: 200,
      }}
    />
  );
}