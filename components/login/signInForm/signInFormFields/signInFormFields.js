import { TextInput, Text } from "react-native";
import { styles, transparentColors, textColors } from "../../../../style";

export const SignInFormFields = ({ signUp, setUserName, setPassword, setRepeatPassword, setDisplayName, submitForm}) => {

  return (
    <>

      <TextInput
        onChangeText={t => { setUserName(t) }}
        style={styles.inputFieldLine}
        placeholder={'username'}
        placeholderTextColor={transparentColors.white}
      />

      <TextInput
        onChangeText={t => { setPassword(t) }}
        style={styles.inputFieldLine}
        placeholder={'password'}
        onSubmitEditing={() => {
          if (!signUp) {
            submitForm();
          }
        }}
        secureTextEntry
        placeholderTextColor={transparentColors.white}
      />

      {signUp &&
        <>

          <TextInput
            onChangeText={t => { setRepeatPassword(t) }}
            style={styles.inputFieldLine}
            placeholder={'repeat password'}
            placeholderTextColor={transparentColors.white}
            secureTextEntry
          />

          <TextInput
            onChangeText={t => { setDisplayName(t) }}
            style={styles.inputFieldLine}
            placeholder={'display name'}
            placeholderTextColor={transparentColors.white}
            onSubmitEditing={submitForm}
          />

          <Text style={[styles.paragraph, textColors.white]}>
            *Note! No password reset system has be implemented yet, so please keep track of your credentials
          </Text>

        </>
      }
    </>
  )

}