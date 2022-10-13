import { Text, View } from 'react-native';
import { styles } from '../../../style';
import { ListItem } from './storyListItem';
import { GenerateRandomString } from '../../../helperFunctions/helpers';

export const StoryList = (props) => {

  return (
    <View>
      {props.listItemInfo && props.listItemInfo.map(listItemInfo => (
        <ListItem listItemInfo={listItemInfo} key={GenerateRandomString()} appNavigation={props.appNavigation} />
      ))}
    </View>
  );

}