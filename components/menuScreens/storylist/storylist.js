import { Text, View } from 'react-native';
import { styles } from '../../../style';
import { ListItem } from './storyListItem';

export const StoryList = (props) => {

  //renders a listitem for each room
  return (
    <View>
      {props.rooms && props.rooms.map(room => (
        <ListItem type={props.type} room={room} key={room.title}/>
      ))}
    </View>
  );
}