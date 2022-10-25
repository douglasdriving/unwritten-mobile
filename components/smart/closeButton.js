import { TouchableWithoutFeedback, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export const CloseButton = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={props.handlePress}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
      }}>
      <View style={{
        width: 60,
        height: 60,
        borderColor: 'red',
        borderWidth: 2,
      }}>
        <Icon name="close-outline" size={30} />
      </View>
    </TouchableWithoutFeedback >

  );
}