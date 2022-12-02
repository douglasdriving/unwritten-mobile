import { View, Text } from "react-native";
import { TimeToHms } from "../../../helpers/helpers";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/userSlice";

export const PlayerRow = (props) => {

  const userName = useSelector(selectUserName);
  
  const strikeEmojis = () => {
    let emojiString = '';
    for (let i=0; i < props.player.strikes; i++){
      emojiString += '❌';
    }
    return emojiString;
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 5,
      backgroundColor: 'lightgray',
    }}>
      {props.player &&
        <Text style={props.player.name == userName && {color: 'blue'}}>
          {props.player.name + ' ' + strikeEmojis()}
        </Text>
      }
      {props.isNextPlayer && <Text>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>}
    </View>
  );
}