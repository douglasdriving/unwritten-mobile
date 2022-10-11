import { Button, Text, View } from 'react-native';
import { styles } from '../../../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

const topRowStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};

export const ListItem = (props) => {

  const [open, setOpen] = useState(false);

  let alert;
  if (props.alert && props.type == 'ongoing') {
    alert = <Text style={styles.alert}>{props.alert}</Text>
  }

  let content = (<Text>This is the content</Text>);

  // switch (props.type) {
  //   case 'joinable':
  //     content = (
  //       <View>
  //         <Text style={styles.body}>The best story every written</Text>
  //         <Text style={styles.body}>Created by Author</Text>
  //         <Button title='Join ->'></Button>
  //       </View>
  //     );
  //     break;
  //   case 'ongoing':
  //     content = (
  //       <View>
  //         <Text style={styles.body}>With Smogg (creator), Sebbe, and Noobalot</Text>
  //         <Text style={styles.body}>🎲 Waiting for Sebbe to play turn 23 of 40</Text>
  //         <Button title='Enter ->'></Button>
  //       </View>
  //     );
  //     break;
  //   case 'finished':
  //     content = (
  //       <View>
  //         <Text>A great story about a bunch of great events</Text>
  //         <Text style={styles.body}>By GoatPoet, Sebbe, Smogg, and DarkHorseForever</Text>
  //         <Button title='Read Story ->'></Button>
  //       </View>
  //     );
  //     break;
  // };

  return (
    <View style={styles.listItem}>

      <View style={topRowStyle}>
        <Text style={styles.h3}>{props.room.title}</Text>
        {props.alert && alert}
        <Icon name={open ? "arrow-up" : "arrow-down"} size={20} />
      </View>

      {open && content}

    </View>
  );
}