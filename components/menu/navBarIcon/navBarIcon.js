import { View } from "react-native";
import { colors, transparentColors, appDimensions } from "../../../style";

export const NavBarIcon = (props) => {

  const { focused, IconComp, iconSize, iconName } = props;

  const SetIcon = () => {
    return (
      <IconComp
        name={iconName}
        size={iconSize}
        color={colors.fire}
      />
    )
  }

  return (

    focused ?
      <View style={{
        backgroundColor: transparentColors.white,
        borderRadius: appDimensions.borderRadius,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <SetIcon />
      </View>
      :
      <SetIcon />

  );

}