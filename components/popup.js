import { StyleSheet, Modal, Button, View, Text } from "react-native";
import { CloseButton } from "./closeButton";
import { styles } from "../style";
import { useState } from "react";
import { GenerateRandomString } from "../helperFunctions/helpers";

export const Popup = (props) => {

  /*
  possible props:
  title = heading text
  text = descriptive text
  onClose = what happens when you press x in corner. Pass callback
  loading = true/false depending on if this is a loader
  buttons = [
    {
      title: text on the button
      handlePress: callback for when you press the button
    },
  ]
  */

  const [rendered, setRendered] = useState(true);

  const Close = () => {
    setRendered(false);
  }

  return (

    rendered &&

    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={popupStyles.view}>
        <View style={popupStyles.background} />
        <View style={popupStyles.box}>
          {!props.loading && <CloseButton handlePress={props.onClose}/>}
          <View style={popupStyles.content}>
            <Text style={styles.h2}>{props.title}</Text>
            {props.text && <Text>{props.text}</Text>}
            {props.buttons &&
              <View style={popupStyles.buttonRow}>
                {props.buttons.map(button => (
                  <Button title={button.title} onPress={button.handlePress} key={button.title}/>
                ))}
              </View>
            }
          </View>
        </View>
      </View>
    </Modal>

  );
}

const popupStyles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  box: {
    backgroundColor: 'white',
    margin: 30,
  },
  content: {
    margin: 40,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});