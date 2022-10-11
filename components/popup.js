import { StyleSheet, Modal, Button, View, Text } from "react-native";
import { CloseButton } from "./closeButton";
import { styles } from "../style";

export const Popup = (props) => {

  const test = ['hello1', 'hello2'];

  return (
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
        <View style={popupStyles.background}/>
        <View style={popupStyles.box}>
          <CloseButton/>
          <View style={popupStyles.content}>
            <Text style={styles.h2}>{props.popup.title}</Text>
            <Text>{props.popup.text}</Text>
            <View style={popupStyles.buttonRow}>
              {props.popup.buttons.map(button => (
                <Button title={button.title}/>
              ))}
            </View>
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
  content:{
    margin: 40,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});