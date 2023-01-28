import { Text } from "react-native";
import { MyButton } from "../../smart/myButton";
import { styles, textColors, colors } from "../../../style";
import { Space } from "../../smart/visuals";

export const WelcomeScreenField = (props) => {

  const { onButtonPress } = props;

  return (

    <>
      <Text style={[styles.title, { color: colors.white }]}>Unwritten</Text>
      <Text style={[styles.paragraph, styles.textCenter, styles.bold, textColors.white]}>Tell stories together</Text>
      {Space(15)}
      <MyButton
        onPress={onButtonPress}
        color={colors.white}
        textColor={colors.light}
        title='Enter'
        width='100%'
      />
    </>

  );
}