import { StyleSheet, Modal, Button, View, Text } from "react-native";
import { styles, colors } from "../../style";
import { CloseButton } from "./closeButton";
import { MyButton } from "./myButton";

export const Popup = (props) => {

  const {
    onClose,
    loading,
    title,
    text,
    buttons,
  } = props

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
          {!loading && <CloseButton handlePress={onClose} />}
          <View style={popupStyles.content}>
            <Text style={styles.h1}>{title}</Text>
            {text && (
              Array.isArray(text) ?
                text.map((text, i) =>
                  <Text key={i} style={[styles.paragraph, { color: colors.white }]}>{text}</Text>
                ) :
                <Text style={[styles.paragraph, { color: colors.white }]}>{text}</Text>
            )}
            {buttons &&
              <View style={popupStyles.buttonRow}>
                {buttons.map(button => (
                  <MyButton
                    title={button.title}
                    onPress={button.handlePress}
                    key={button.title}
                    flex
                    color={colors.fire}
                    textColor={colors.light}
                  />
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
    backgroundColor: colors.light,
    margin: 30,
    width: '85%',
  },
  content: {
    margin: 40,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15
    // justifyContent: 'space-between'
  }
});