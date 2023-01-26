import { TouchableWithoutFeedback, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../../style";
import { Space } from "./visuals";

export const CloseButton = (props) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={props.handlePress}>
        <View style={{
          width: 50,
          height: 50,
          // borderWidth: 2,
          top: -15,
          left: -15,
          backgroundColor: colors.fire,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 5,
          borderRadius: 10,
        }}>
          <Icon name="close-outline" size={30} />
        </View>
      </TouchableWithoutFeedback >
    </View>

  );
}