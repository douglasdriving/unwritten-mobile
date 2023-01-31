import { Text } from 'react-native';
import { colors, colors2, styles } from '../../../../style';

export const Paragraph = (props) => {

  const { isUser } = props;

  return (
    <>
      <Text style={{marginBottom: 10}}>

        <Text
          style={[
            styles.paragraph,
            {
              color: colors2.white,
              fontWeight: (isUser ? 'bold' : 'regular'),
            },
          ]}
        >
          {`(@${props.authorName}) `}
        </Text>

        <Text style={[
          styles.paragraph,
          {
            color: colors2.white,
          },
        ]}
        >
          {props.scenario.scenario}
        </Text>

      </Text>
    </>

  );
}