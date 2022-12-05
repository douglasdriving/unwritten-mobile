import { StyleSheet, Modal, Button, View, Text, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../../style";
import { CloseButton } from "./closeButton";
import { useState } from "react";

/*
The idea:
this should just be a field
when you press it, it expands and covers the whole flexbox!
then you can write in it
and when you finish, it streches back down again
so basically, it changes its own style "onfocus"
*/

export const FocusInputField = (props) => {

  const [textInput, setTextInput] = useState('');
  const [focused, setFocused] = useState(false);

  const handleDonePress = () => {
    Keyboard.dismiss();
    setFocused(false);
    props.setText(textInput);
  }

  const handleAreaPress = () => {
    setFocused(true);
  }

  const handleTextChange = (text) => {
    setTextInput(text);
  }

  return (
    <>

      {/* View in form */}
      {!focused && <Text style={styles.h2}>{props.label}</Text>}
      <TouchableWithoutFeedback onPress={handleAreaPress}>
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            backgroundColor: 'white',
            padding: 10,
            height: props.height,
          }}
        >
          <Text>{textInput}</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Appears on focus */}
      {focused &&
        <View style={{
          flex: 1,
          position: 'absolute',
          alignSelf: 'center',
          width: '100%',
          height: '100%',
          zIndex: 3,
          backgroundColor: 'white',
          padding: 15,
          marginTop: 25,
          borderWidth: 2
        }}>
          {focused && <Text style={styles.h2}>{props.label}</Text>}
          <TextInput
            style={{
              flex: 1,
              textAlignVertical: 'top',
              padding: 0,
            }}
            autoFocus={true}
            onChangeText={handleTextChange}
            defaultValue={textInput}
            onEndEditing={handleDonePress}
          />
          {focused && <Button title='done' onPress={handleDonePress} />}
        </View>
      }

    </>

  );
}