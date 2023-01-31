import { View } from "react-native";
import { colors, transparentColors, appDimensions, colors2, transparentColors2 } from "../../../style";

export const NavBarIcon = (props) => {

  const { focused, IconComp, iconSize, iconName } = props;

  const SetIcon = () => {
    return (
      <IconComp
        name={iconName}
        size={iconSize}
        color={colors2.orange}
      />
    )
  }

  return (

    focused ?
      <View style={{
        backgroundColor: transparentColors2.white,
        borderRadius: appDimensions.borderRadius,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <SetIcon />
      </View>
      :
      <SetIcon />

  );

}