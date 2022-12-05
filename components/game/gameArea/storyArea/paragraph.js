import { Text, View } from 'react-native';
import { styles } from '../../../../style';

export const Paragraph = (props) => {

  return (
    <>
      <Text >

        <Text
          style={{
            ...styles.paragraph,
            color: (props.isUser ? 'lightblue' : 'lightgrey'),
          }}
        >
          {`(@${props.authorName}) `}
        </Text>

        <Text style={{ ...styles.paragraph, ...props.isUser && { color: 'blue' } }}>
          {props.scenario.scenario}
        </Text>

      </Text>
    </>

  );
}