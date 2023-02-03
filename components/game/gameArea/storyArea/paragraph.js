import { Text } from 'react-native';
import { colors, colors2, styles, textColors2 } from '../../../../style';

export const Paragraph = (props) => {

  const { isUser, authorName, scenario } = props;

  return (
    <>
      <Text style={{ marginBottom: 3 }}>

        <Text
          style={[
            styles.paragraph,
            {
              color: colors2.orange,
              fontWeight: (isUser ? 'bold' : 'regular'),
            },
          ]}
        >
          {`(@${authorName}) `}
        </Text>

        <Text style={[
          styles.paragraph,
          {
            color: colors2.white,
          },
        ]}
        >
          {scenario.scenario}
        </Text>

      </Text>

      {scenario.prompt &&
        <Text style={[styles.paragraph, textColors2.light]}>
          {`(${scenario.prompt})`}
        </Text>
      }
    </>

  );
}