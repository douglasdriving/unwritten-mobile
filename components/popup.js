import { StyleSheet, Modal, Button, View, Text } from "react-native";
import { CloseButton } from "./closeButton";
import { styles } from "../style";

export const Popup = (props) => {
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
        <View style={popupStyles.box}>
          <CloseButton/>
          <View style={popupStyles.content}>
            <Text style={styles.h2}>{props.title}</Text>
            <Text>{props.description}</Text>
            <View style={popupStyles.buttonRow}>
              <Button title={'button1'}/>
              <Button title={'button2'}/>
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
  box: {
    backgroundColor: 'gray',
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