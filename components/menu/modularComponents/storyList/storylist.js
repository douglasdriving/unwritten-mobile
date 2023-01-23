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

// const DummyItem = (props) => {
//   return (
//     <ListItem
//       {...props}
//       key={GenerateRandomString()}
//       listItemInfo={
//         {
//           title: 'title',
//           alert: false,
//           description: 'this is a list item',
//           playersTurn: false,
//           creator: 'userman',
//           authors: ['modig', 'fläsk', 'snoppen'],
//           authorCount: 4,
//           turn: 23,
//           buttonText: 'enter',
//           roomId: 13
//         }
//       }
//     />
//   )
// }