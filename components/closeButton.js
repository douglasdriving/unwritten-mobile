import { View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export const CloseButton = () => {
  return (
    <View style={{
      position: 'absolute',
      width: '100%',
      alignItems: 'flex-end',
      // borderColor: 'red',
      // borderWidth: 2,
      alignSelf: 'flex-end',
    }}>
      <Icon name="close-outline" size={30}/>
    </View>
  );
}