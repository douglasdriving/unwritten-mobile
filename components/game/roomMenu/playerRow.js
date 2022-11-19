import { View, Text } from "react-native";
import { TimeToHms } from "../../../helpers/helpers";

export const PlayerRow = (props) => {
  
  const strikeEmojis = () => {
    //problem: we dont get the strikes prop in the player obj
    //find it!
    //console.log(props.player.name + ' has ' + props.player.strikes + ' strikes');
    let emojiString = '';
    for (let i=0; i < props.player.strikes; i++){
      emojiString += '❌';
    }
    return emojiString;
  }

  // console.log(props.player);

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 5,
      backgroundColor: 'lightgray',
    }}>
      {props.player &&
        <Text style={props.player.name == props.user.name && {color: 'blue'}}>
          {props.player.name + ' ' + strikeEmojis()}
        </Text>
      }
      {props.isNextPlayer && <Text>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>}
    </View>
  );
}