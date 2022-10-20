import { View, Text, Button } from "react-native";

export const Actions = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Button title="Continue" onPress={() => props.SetWritingField('continuation')}/>
        <Text> </Text>
      </View>
      <View>
        <Button title="Write Ending" onPress={() => props.SetWritingField('ending')}></Button>
        <Text>Available in 30 turns</Text>
      </View>
    </View>
  );
}