import { TouchableWithoutFeedback, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export const CloseButton = (props) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={props.handlePress}>
        <View style={{
          width: 50,
          height: 50,
          borderWidth: 2,
          top: -15,
          left: -15,
          backgroundColor: "lightgrey",
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          // alignSelf: 'center'
        }}>
          <Icon name="close-outline" size={30} />
        </View>
      </TouchableWithoutFeedback >
    </View>

  );
}