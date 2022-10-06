import { Text, View } from 'react-native';
import { styles } from '../../../style';
import { ListItem } from './storyListItem';

export const StoryList = (props) => {
  return (
    <View>
      <ListItem open={true} type={props.type}/>
      <ListItem open={false} type={props.type} alert={'Your Turn!'}/>
      <ListItem open={false} type={props.type}/>
    </View>
  );
}