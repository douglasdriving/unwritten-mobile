import { View } from 'react-native';
import { GenerateRandomString } from '../../../../helpers/helpers';
import { ListItem } from './listItem';

export const StoryList = (props) => {

  return (
    <View>
      {props.listItemInfo && props.listItemInfo.map(listItemInfo => (
        <ListItem
          {...props}
          key={GenerateRandomString()}
          listItemInfo={listItemInfo}
        />

      ))}
    </View>
  );

}