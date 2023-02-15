import { Text, View } from 'react-native';
import { appDimensions, colors2, styles, textColors2, transparentColors2 } from '../../../../../style';
import { LikeButton } from './likeButton/likeButton';

export const Paragraph = (props) => {

  const { authorName, scenario } = props;

  //add the like button here :)

  return (
    <View style={{
      backgroundColor: transparentColors2.light,
      borderRadius: appDimensions.borderRadius,
      marginBottom: 15,
      padding: 10
    }}>

      <Text style={[styles.paragraph, textColors2.light, { marginBottom: 0, fontSize: 14 }]}>
        {
          `(@${authorName}`
          + (scenario.prompt ? ` - ${scenario.prompt}` : '')
          + ')'
        }
      </Text>

      <Text style={[
        styles.paragraph,
        {
          color: colors2.white,
          fontSize: 18,
        },
      ]}
      >
        {scenario.scenario}
      </Text>

      <LikeButton
        likes={scenario.likes}
        nodeId={scenario.node_id}
      />

    </View>
  );
}