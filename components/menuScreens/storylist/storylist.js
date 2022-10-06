import { Text, View } from 'react-native';
import { styles } from '../../../style';
import { ListItem } from './storyListItem';

export const StoryList = () => {
  return (
    <View>
      <ListItem open={true}/>
      <ListItem open={false}/>
      <ListItem open={false}/>
    </View>
  );
}