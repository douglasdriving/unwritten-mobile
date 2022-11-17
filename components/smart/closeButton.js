import { TouchableWithoutFeedback, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export const CloseButton = (props) => {
  return (
    <View style={{height:30}}>
      <TouchableWithoutFeedback
        onPress={props.handlePress}
        style={{
          width: 150,
          height: 150,
          position: 'absolute',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{
          width: 75,
          height: 75,
          // borderColor: 'red',
          // borderWidth: 2,
          left: -25,
          top: -25,
          // backgroundColor: "lightgrey",
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}>
          <Icon name="close-outline" size={30} />
        </View>
      </TouchableWithoutFeedback >
    </View>

  );
}