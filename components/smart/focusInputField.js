import { StyleSheet, Modal, Button, View, Text, TextInput } from "react-native";
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

  const [focused, setFocused] = useState(false);

  return (
    <>
      {!focused && <Text style={styles.h2}>{props.label}</Text>}
      <View style={{
        flex: 1,
        position: (focused ? 'absolute' : 'relative'), //so, this thing should toggle depending on focus
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'white',
        padding: 10,
      }}>
        {focused && <Text style={styles.h2}>{props.label}</Text>}
        <TextInput
          style={{
            flex: 1,
            textAlignVertical: 'top',
            padding: 0
          }}
          onFocus={() => setFocused(true)}
        />
        {focused && <Button title='done' onPress={() => setFocused(false)}/>}
      </View>
    </>

  );
}