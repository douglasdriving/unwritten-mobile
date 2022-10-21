import { Text, View } from 'react-native';
import { GetLoggedUserName } from '../../../backendCalls/backendCalls';

export const Paragraph = (props) => {

  return (
    <View>

      <Text style={ (props.scenario.author.name == GetLoggedUserName()) && {color: 'blue'}}>
        {props.scenarioNumber}. {props.scenario.author.name}
      </Text>

      <Text style={ (props.scenario.author.name == GetLoggedUserName()) && {color: 'blue'}}>
        {props.scenario.text}
      </Text>

    </View>
  );
}