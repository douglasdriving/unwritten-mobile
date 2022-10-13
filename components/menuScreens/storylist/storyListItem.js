import { Button, Text, View, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../../../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';

const topRowStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};

//to generate a list item, include a prop in the following format:
// listItemInfo = {
//   alert: true,
//   title: 'story title',
//   description: 'story description',
//   creator: 'story creator',
//   authors: ['author1', 'author2', 'author3'],
//   authorCount: 3,
//   turn: 23,
//   buttonText: 'press me'
//    id: 'oj80jd2398j;
// };

export const ListItem = (props) => {

  //console.log('generated list item with infO: ', props.listItemInfo);

  const [open, setOpen] = useState(false);

  let alert;
  if (props.listItemInfo.playersTurn) {
    alert = <Text style={styles.alert}>Your Turn!</Text>
  }

  const Toggle = () => {
    setOpen(!open);
    return;
  }

  const HandleButtonPress = () => {
    console.log('opening room with id: ', props.listItemInfo.roomId);
    props.appNavigation.navigate('Game');
  }

  const GenerateAuthorText = () => {
    let authorText = null;
    if (props.listItemInfo.authors.length > 0) {
      authorText = 'Authors:'
      props.listItemInfo.authors.forEach(author => {
        authorText += ' ' + author + ','
      });
    }
    return authorText;
  }

  return (
    <TouchableWithoutFeedback onPress={Toggle}>
      <View style={styles.listItem}>

        <View style={topRowStyle}>
          {props.listItemInfo.title && <Text style={styles.h3}>{props.listItemInfo.title}</Text>}
          {props.listItemInfo.playersTurn && alert}
          <Icon name={open ? "arrow-up" : "arrow-down"} size={20} />
        </View>

        {open &&
          (
            <View>
              {props.listItemInfo.description && <Text>{props.listItemInfo.description}</Text>}
              {props.listItemInfo.creator && <Text>Creator: {props.listItemInfo.creator}</Text>}
              {props.listItemInfo.authors && <Text>{GenerateAuthorText()}</Text>}
              {props.listItemInfo.authorCount && <Text>🧔 {props.listItemInfo.authorCount}/4 writers</Text>}
              {props.listItemInfo.turn && <Text>🎲 Turn {props.listItemInfo.turn}/40</Text>}
              {props.listItemInfo.buttonText && <Button title={props.listItemInfo.buttonText} onPress={HandleButtonPress} />}
            </View>
          )
        }

      </View>
    </TouchableWithoutFeedback>

  );
}