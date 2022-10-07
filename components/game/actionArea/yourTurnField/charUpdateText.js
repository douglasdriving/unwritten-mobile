import { Text } from "react-native";
import { styles } from "../../../../style";

export const CharUpdateText = () => {

  let totalChars = 532;

  return(
    <Text style={styles.body}>You got 500 new characters! You now have {totalChars} characters to write with.</Text>
  )
}