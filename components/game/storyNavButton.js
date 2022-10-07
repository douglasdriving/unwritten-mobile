import { View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../style';

export const StoryNavButton = (props) => {

  const type = props.type;
  let iconName = 'ellipse-outline';
  let size = 40;
  if (type == 'close'){
    iconName = 'close-outline';
    size = 50;
  }
  else if (type == 'menu'){
    iconName = 'people-outline'
  }

  return (
    <View style={styles.storyNavButton}>
      <Icon name={iconName} size={size}/>
    </View>
  );
}