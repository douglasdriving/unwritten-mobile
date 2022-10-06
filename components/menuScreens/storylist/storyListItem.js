import { Button, Text, View } from 'react-native';
import { styles } from '../../../style';
import Icon from 'react-native-vector-icons/Ionicons';

const topRowStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};

export const ListItem = (props) => {

  console.log('open prop:', props.open);

  const topRow = (
    <View style={topRowStyle}>
      <Text style={styles.h3}>Story Title</Text>
      <Icon name={props.open ? "arrow-up" : "arrow-down"} size={20} />
    </View>
  );

  const toggleContent = (
    <View>
      <Text style={styles.body}>The best story every written</Text>
      <Text style={styles.body}>Created by Author</Text>
      <Button title='Join ->'></Button>
    </View>
  );

  return (
    <View style={styles.listItem}>
      {topRow}
      {props.open && toggleContent}
    </View>
  );
}