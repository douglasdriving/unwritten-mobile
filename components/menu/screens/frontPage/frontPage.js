import { styles, colors2, textColors2 } from "../../../../style";
import { ScrollView, Text, View, ImageBackground } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Space } from "../../../smart/visuals";
import { Feed } from "./feed/feed";
import background from '../../../../assets/background/campfireBackgroundBlurred.png';
import { News } from "./news/news";

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

        <News />

        <Text style={[styles.h2, textColors2.white]}>
          Recent story additions
        </Text>

        <Feed />

        {Space(100)}

      </ScrollView>

    </ImageBackground>
  );

}