import { StyleSheet, Modal, Button, View, Text } from "react-native";
import { styles } from "../../style";
import { CloseButton } from "./closeButton";
import { MyButton } from "./myButton";

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
        <View style={popupStyles.background} />
        <View style={popupStyles.box}>
          {!props.loading && <CloseButton handlePress={props.onClose} />}
          <View style={popupStyles.content}>
            <Text style={styles.h1}>{props.title}</Text>
            {props.text && (
              Array.isArray(props.text) ?
                props.text.map((text, i) => <Text key={i} style={styles.paragraph}>{text}</Text>) :
                <Text>{props.text}</Text>
            )}
            {props.buttons &&
              <View style={popupStyles.buttonRow}>
                {props.buttons.map(button => (
                  <MyButton title={button.title} onPress={button.handlePress} key={button.title} />
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
    opacity: 0.5,
  },
  box: {
    backgroundColor: 'white',
    margin: 30,
    width: '85%',
  },
  content: {
    margin: 40,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between'
  }
});