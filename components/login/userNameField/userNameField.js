import { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { styles, textColors2, transparentColors2 } from "../../../style";
import { MyButton } from "../../smart/myButton";

export const UserNameField = () => {

  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonPress = async () => {

    setLoading(true);
    //++call backend to set the display name
    //++wait for return
    //++if an error is returned - show it
    //++if not - navigate into the game
    setLoading(false);

  }

  return (
    <>
      <View style={styles.darkenedBox}>

        {loading ?

          <Text>...</Text>

          :

          <>

            <Text style={[styles.h3, textColors2.white, styles.textCenter]}>
              Thanks for signing in to Unwritten for the first time!
            </Text>

            <Text style={[styles.paragraph, textColors2.white, styles.textCenter]}>
              Before we begin, please add a display name. This is the name that will be shown to other players.
            </Text>

            <TextInput
              onChangeText={t => { setName(t) }}
              style={[styles.inputFieldLine, { width: '100%' }, styles.textCenter]}
              placeholder={'your display name here'}
              placeholderTextColor={transparentColors2.white}
            />

            <MyButton
              title='Set display name'
              disabled={!name || name.length < 1}
              width='100%'
            />
          </>
        }

      </View>
    </>

  )

}