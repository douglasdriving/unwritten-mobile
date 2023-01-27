import { styles, textColors, colors } from "../../../../style";
import { ScrollView, Text, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Space } from "../../../smart/visuals";
import { Feed } from "./feed/feed";

export const FrontPage = () => {

  return (
    <ScrollView style={styles.menuPageContainer}>

      <View style={{ alignItems: 'center' }}>
        <Ionicon
          name="bonfire"
          size={50}
          color={colors.fire}
        />
        <Text style={[styles.title, textColors.fire, styles.textCenter]}>Unwritten</Text>
      </View>

      <Text style={[styles.h3, textColors.white]}>
        Update (24 January 2023)
      </Text>

      <Text style={[styles.paragraph, textColors.white]}>
        Unwritten has now been playtested in beta and is moving towards an official
        launch during spring 2023! If you have suggestions for things that should be changed or added,
        please send then to feedback@unwritten.site. Thanks for playing!
      </Text>

      <Text style={[styles.h3, textColors.white]}>
        Recent story additions
      </Text>

      <Feed />

      {Space(100)}

    </ScrollView>
  );

}