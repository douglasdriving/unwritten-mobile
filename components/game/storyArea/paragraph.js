import { Text, View } from 'react-native';

export const Paragraph = (props) => {

  return (
    <View>

      <Text style={ props.isUser && {color: 'blue'}}>
        {props.scenarioNumber}. {props.scenario.author.name}
      </Text>

      <Text style={ props.isUser && {color: 'blue'}}>
        {props.scenario.text}
      </Text>

    </View>
  );
}