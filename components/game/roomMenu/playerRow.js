import { View, Text } from "react-native";
import { TimeToHms } from "../../../helpers/helpers";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/userSlice";
import { colors, styles } from "../../../style";

export const PlayerRow = (props) => {

  const userName = useSelector(selectUserName);

  const strikeEmojis = () => {
    let emojiString = '';
    for (let i = 0; i < props.player.strikes; i++) {
      emojiString += '❌';
    }
    return emojiString;
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      marginTop: 5,
      backgroundColor: colors.white,
    }}>
      {props.player &&
        <Text style={
          [styles.paragraph,
          {
            fontWeight: (props.player.name == userName ? 'bold' : 'regular')
          }]
          }>
          {props.player.name + ' ' + strikeEmojis()}
        </Text>
      }
      {props.isNextPlayer && <Text style={styles.paragraph}>⏳ {TimeToHms(props.timeLeftInTurn)}</Text>}
    </View>
  );
}