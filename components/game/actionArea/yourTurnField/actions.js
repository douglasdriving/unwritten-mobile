import { View, Text, Button } from "react-native";

export const Actions = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Button title="Continue"></Button>
        <Text> </Text>
      </View>
      <View>
        <Button title="Write Ending"></Button>
        <Text>Available in 30 turns</Text>
      </View>
    </View>
  );
}