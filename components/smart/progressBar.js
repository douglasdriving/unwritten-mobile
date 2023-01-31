import { View, Text } from "react-native";
import { colors, colors2, styles, textColors, textColors2 } from "../../style";

export const ProgressBar = (props) => {

  let fillPercent = props.percent;
  if (fillPercent > 100) fillPercent = 100;

  return (
    <View style={{
      width: props.width,
      alignItems: 'center'
    }}>
      {props.label && <Text style={[styles.paragraph, textColors2.white]}>{props.label}</Text>}
      <View style={{
        width: '100%',
        height: 20,
        backgroundColor: colors2.white,
        borderRadius: 10,
      }}>
        <View style={{
          width: (fillPercent + '%'),
          height: 20,
          backgroundColor: colors2.red,
          borderRadius: 10,
        }}>
        </View>
      </View>
    </View>

  );
}