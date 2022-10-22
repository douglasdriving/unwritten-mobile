import { View, Text } from "react-native";
import { TimeToHms } from "../../../helperFunctions/helpers";
import { GetLoggedUserName } from "../../../backendCalls/backendCalls";

export const PlayerRow = (props) => {

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 5,
      backgroundColor: 'lightgray',
    }}>
      {props.player &&
        <Text style={props.player.name == GetLoggedUserName() && {color: 'blue'}}>
          {props.player.name}
        </Text>
      }
      {props.isNextPlayer && <Text>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>}
    </View>
  );
}