import { Text, View } from 'react-native';
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
      <Text style={styles.h2}>Story Title</Text>
      <Icon name="arrow-down" size={20} />
    </View>
  );

  const toggleContent = (
    <Text style={styles.body}>The best story every written</Text>
  );

  return (
    <View style={styles.listItem}>
      {topRow}
      {props.open && toggleContent}
    </View>
  );
}