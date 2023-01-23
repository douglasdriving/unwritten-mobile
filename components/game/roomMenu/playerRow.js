import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/userSlice";
import { colors, styles, textColors } from "../../../style";
import { TurnTimer } from "../../smart/turnTimer";

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
      marginTop: 5,
      alignItems: 'center',
    }}>
      <Text style={{marginRight: 5, fontSize: 20, padding: 0, margin: 0}}>🧑</Text>
      <View style={{
        backgroundColor: colors.dark,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
      }}>
        {props.player &&
          <Text style={
            [styles.paragraph,
            {
              fontWeight: (props.player.name == userName ? 'bold' : 'regular')
            }, textColors.white]
          }>
            {' ' + props.player.name + ' ' + strikeEmojis()}
          </Text>
        }
        {props.isNextPlayer && <TurnTimer color={colors.dark} />}
      </View>
    </View>
  );
}