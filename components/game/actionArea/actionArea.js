import { View, Text } from "react-native";
import { YourTurnField } from './yourTurnField/yourTurnField.js';
import { WritingField } from './writingField/writingField.js';
import { PlayerSearchField } from './playerSearchField/playerSearchField.js';
import { WaitingField } from './waitingField/waitingField.js';


export const ActionArea = () => {
  return(
    <View style={{height: 100, width: 100, backgroundColor: "red"}}>
      <Text>This is the action area!</Text>
    </View>
  );
}