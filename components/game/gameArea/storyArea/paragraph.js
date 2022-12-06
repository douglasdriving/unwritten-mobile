import { Text, View } from 'react-native';
import { colors, styles } from '../../../../style';

export const Paragraph = (props) => {

  const { isUser } = props;

  return (
    <>
      <Text style={{marginBottom: 10}}>

        <Text
          style={[
            styles.paragraph,
            {
              color: colors.light,
              fontWeight: (isUser ? 'bold' : 'regular'),
            },
          ]}
        >
          {`(@${props.authorName}) `}
        </Text>

        <Text style={[
          styles.paragraph,
          {
            color: colors.light,
            // fontWeight: (isUser ? 'bold' : 'regular'),
          },
        ]}
        >
          {props.scenario.scenario}
        </Text>

      </Text>
    </>

  );
}