import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, styles } from '../../../style';

export const StoryNavButton = (props) => {

  const type = props.type;
  let iconName = 'ellipse-outline';
  let size = 40;
  if (type == 'close') {
    iconName = 'arrow-back-outline';
    size = 40;
  }
  else if (type == 'menu') {
    iconName = 'alert-circle-outline'
  }

  const handlePress = () => {
    props.onPress();
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.storyNavButton} >
        <Icon name={iconName} size={size} color={colors.dark}/>
      </View>
    </TouchableWithoutFeedback >
  );
}