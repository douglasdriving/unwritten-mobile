import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/userSlice";
import { appDimensions, styles, textColors2, transparentColors2 } from "../../../style";

export const PlayerRow = (props) => {

  const userName = useSelector(selectUserName);
  const { name } = props.player;

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      alignItems: 'center',
    }}>
      <Text style={{ marginRight: 5, fontSize: 20, padding: 0, margin: 0 }}>🧑</Text>
      <View style={{
        backgroundColor: transparentColors2.red,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        borderRadius: appDimensions.borderRadius
      }}>
        {name &&
          <Text style={
            [styles.paragraph,
            {
              fontWeight: (name == userName ? 'bold' : 'regular')
            }, textColors2.night]
          }>
            {' ' + name}
          </Text>
        }
      </View>
    </View>
  );
}