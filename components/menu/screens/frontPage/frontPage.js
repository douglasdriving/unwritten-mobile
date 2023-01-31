import { styles, textColors, colors, transparentColors, colors2, textColors2 } from "../../../../style";
import { ScrollView, Text, View, ImageBackground } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Space } from "../../../smart/visuals";
import { Feed } from "./feed/feed";
import background from '../../../../assets/background/campfireBackgroundBlurred.png';

export const FrontPage = () => {

  return (
    <ImageBackground source={background} resizeMode='cover' style={{
      flex: 1
    }}>
      <ScrollView style={styles.menuPageContainer}>

        <View style={{ alignItems: 'center' }}>
          <Ionicon
            name="bonfire"
            size={50}
            color={colors2.orange}
          />
          <Text style={[styles.title, textColors2.light, styles.textCenter]}>Unwritten</Text>
        </View>

        <Text style={[styles.h3, textColors2.white]}>
          Update (24 January 2023)
        </Text>

        <Text style={[styles.paragraph, textColors2.white]}>
          Unwritten has now been playtested in beta and is moving towards an official
          launch during spring 2023! If you have suggestions for things that should be changed or added,
          please send then to feedback@unwritten.site. Thanks for playing!
        </Text>

        <Text style={[styles.h3, textColors2.white]}>
          Recent story additions
        </Text>

        <Feed />

        {Space(100)}

      </ScrollView>

    </ImageBackground>
  );

}