import { Text, View } from 'react-native';

export const Paragraph = (props) => {

  return (
    <View>

      <Text style={ props.isUser && {color: 'blue'}}>
        {props.scenarioNumber}. {props.authorName}
      </Text>

      <Text style={ props.isUser && {color: 'blue'}}>
        {props.scenario.scenario}
      </Text>

    </View>
  );
}