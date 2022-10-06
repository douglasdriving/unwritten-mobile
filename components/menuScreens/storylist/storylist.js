import { Text, View } from 'react-native';
import { styles } from '../../../style';
import { ListItem } from './storyListItem';

export const StoryList = () => {
  return (
    <View>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </View>
  );
}