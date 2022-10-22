import { Button, Text, View, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../../../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';

export const ListItem = (props) => {

  const [open, setOpen] = useState(false);

  //console.log(props.listItemInfo.alert);

  // let alert;
  // if (props.listItemInfo.playersTurn) {
  //   alert = <Text style={styles.alert}>Your Turn!</Text>
  // }

  const Toggle = () => {
    setOpen(!open);
    return;
  }

  const HandleButtonPress = () => {
    props.appNavigation.navigate('Game', { roomId: props.listItemInfo.roomId });
  }

  const GenerateAuthorText = () => {

    const authors = props.listItemInfo.authors;
    if (!authors || authors.length == 0) return null;

    let authorText = null;
    authorText = 'Authors:'
    props.listItemInfo.authors.forEach(author => {
      authorText += ' ' + author.name + ','
    });

    return authorText;

  }

  return (
    <TouchableWithoutFeedback onPress={Toggle}>
      <View style={{
        backgroundColor: 'white',
        width: '100%',
        marginTop: 5,
        padding: 10
      }} >

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          {props.listItemInfo.title && <Text style={styles.h3}>
            {props.listItemInfo.title}
            {props.listItemInfo.alert && '❗'}
            </Text>}
          {props.listItemInfo.playersTurn && props.listItemInfo.alert}
          <Icon name={open ? "arrow-up" : "arrow-down"} size={20} />
        </View>

        {open &&
          (
            <View>
              {props.listItemInfo.description && <Text>{props.listItemInfo.description}</Text>}
              {props.listItemInfo.creator && <Text>Creator: {props.listItemInfo.creator.name}</Text>}
              {(GenerateAuthorText() != null) && <Text>{GenerateAuthorText()}</Text>}
              {props.listItemInfo.authorCount && <Text>🧔 {props.listItemInfo.authorCount}/4 writers</Text>}
              {props.listItemInfo.turn && <Text>🎲 Turn {props.listItemInfo.turn}/40</Text>}
              {props.listItemInfo.buttonText && <Button title={props.listItemInfo.buttonText} onPress={HandleButtonPress} />}
            </View>
          )
        }

      </View>
    </TouchableWithoutFeedback >

  );
}

//LIST ITEM INFO FORMAT
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