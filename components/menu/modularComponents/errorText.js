import {Text} from 'react-native';

export const ErrorText = (props) => {

  return (
    <>
      {(props.message) &&
        <Text style={{ color: 'red' }}>{props.message}</Text>
      }
    </>
  );
}