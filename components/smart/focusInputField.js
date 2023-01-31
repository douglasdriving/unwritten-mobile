import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Modal } from "react-native";
import { styles, colors, menyStyles, appDimensions, textColors2, colors2} from "../../style";
import { useState, useRef, useEffect } from "react";
import { MyButton } from "./myButton";

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

  const innerRef = useRef();
  useEffect(() => {
    if (innerRef.current && !innerRef.current.focused) {
      setTimeout(() => {
        innerRef.current.focus();
      }, 100);
    }
  })

  const handleDonePress = () => {
    // Keyboard.dismiss();
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
      {!focused && <Text style={styles.h3}>{props.label}</Text>}
      <TouchableWithoutFeedback onPress={handleAreaPress}>
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            backgroundColor: 'white',
            padding: 5,
            flex: props.flex,
            borderRadius: appDimensions.borderRadius,
          }}
        >
          <Text style={[styles.body, (!textInput && styles.faded), textColors2.moss]}>
            {textInput || props.placeholder}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Appears on focus */}
      {focused &&
        <Modal
          transparent
        // onShow={() => {
        //   console.log('modal open :)');
        // }}
        >
          <View style={styles.cover} />
          <View style={{
            flex: 1,
            position: 'absolute',
            alignSelf: 'center',
            width: '90%',
            height: '90%',
            zIndex: 3,
            backgroundColor: colors.white,
            padding: 15,
            margin: 25,
            borderWidth: 2,
            borderColor: colors.light,
            borderRadius: appDimensions.borderRadius
          }}>
            {focused && <Text style={[styles.h3, textColors2.moss]}>{props.label}</Text>}
            <TextInput
              style={{
                flex: 1,
                textAlignVertical: 'top',
                padding: 0,
                fontFamily: 'Body',
                color: colors2.moss,
                placeholder: props.placeholder,
              }}
              // autoFocus
              onChangeText={handleTextChange}
              defaultValue={textInput}
              onEndEditing={handleDonePress}
              ref={innerRef}
              multiline
            />
            {focused && <MyButton title='Done' onPress={handleDonePress} color={colors2.wood} textColor={colors2.white}/>}
          </View>
        </Modal>

      }

    </>

  );
}