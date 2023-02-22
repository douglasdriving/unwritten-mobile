import { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { SetDisplayName } from "../../../backend/backendCalls";
import { styles, textColors2, transparentColors2 } from "../../../style";
import { MyButton } from "../../smart/myButton";
import { navigate } from "../../../contexts/rootNavigation";
import { registerForPushNotificationsAsync } from "../../../backend/notifications";

export const UserNameField = () => {

  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleButtonPress = async () => {

    setLoading(true);
    const resp = await SetDisplayName(name)
    if (!resp.ok) {
      setError(resp.message);
    }
    else {
      await registerForPushNotificationsAsync();
      navigate('Menu');
    }
    setLoading(false);

  }

  return (
    <>
      <View style={styles.darkenedBox}>

        {loading ?

          <Text style={[styles.h3, textColors2.white, styles.textCenter]}>...</Text>

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

            {(error && error != '') &&
              <Text style={styles.errorText}>
                {error}
              </Text>
            }

            <MyButton
              title='Set display name'
              disabled={!name || name.length < 1}
              width='100%'
              onPress={handleButtonPress}
            />
          </>
        }

      </View>
    </>

  )

}