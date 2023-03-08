import { StyleSheet, Modal, Button, View, Text } from "react-native";
import { styles, colors, windowHeight, windowWidth, colors2 } from "../../style";
import { CloseButton } from "./closeButton";
import { MyButton } from "./myButton";
import { Alert } from 'react-native';
import { useState } from "react";

export const Popup = (props) => {

  const {
    onClose,
    loading,
    title,
    text,
    buttons,
    textCenter,
    backgroundColor,
    textColor
  } = props

  const [modalVisible, setModalVisible] = useState(true);

  const activeTextColor = { color: textColor || colors2.night };

  const headingStyle = (
    textCenter ?
      [styles.h2, styles.textCenter, activeTextColor] :
      [styles.h2, activeTextColor]
  );
  const bodyStyle = (
    textCenter ?
      [styles.paragraph, activeTextColor, styles.textCenter] :
      [styles.paragraph, activeTextColor]
  );

  return (

    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(false);
      }}
    >
      <View style={popupStyles.view}>
        <View style={popupStyles.background} />
        <View style={[popupStyles.box, , { backgroundColor: backgroundColor || colors2.light }]}>
          {!loading && <CloseButton handlePress={onClose} />}
          <View style={popupStyles.content}>

            {title && <Text style={headingStyle}>{title}</Text>}

            {text && (
              Array.isArray(text) ?
                text.map((text, i) =>
                  <Text key={i} style={bodyStyle}>{text}</Text>
                ) :
                <Text style={bodyStyle}>{text}</Text>
            )}

            {buttons &&
              <View style={popupStyles.buttonRow}>
                {buttons.map((button, i) => (
                  <MyButton
                    title={button.title}
                    onPress={button.handlePress}
                    key={button.title}
                    flex
                    color={colors2.night}
                    textColor={colors2.light}
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
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.7,
  },
  box: {
    backgroundColor: colors.light,
    margin: 30,
    width: '85%',
    borderRadius: 10,
  },
  content: {
    margin: 40,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  }
});