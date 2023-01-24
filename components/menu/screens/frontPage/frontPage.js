import { styles, textColors, colors } from "../../../../style";
import { ScrollView, Text, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { GetFeed } from "../../../../backend/backendCalls";

export const FrontPage = () => {

  const [feed, setFeed] = useState([]);

  const loadFeed = async () => {

    const loadedFeed = await GetFeed();
    //set it, and have it impact the actual window...

  }

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
        Update (24 January 2023):
      </Text>

      <Text style={[styles.paragraph, textColors.white]}>
        Unwritten has now been playtested in beta and is moving towards an official
        launch during spring 2023! If you have suggestions for things that should be changed or added,
        please send then to feedback@unwritten.site. Thanks for playing!
      </Text>

      <Text style={[styles.h3, textColors.white]}>
        Latest posts:
      </Text>

      {feed.length > 0 && (

        feed.map(post =>
          <>
            <Text>this is a post</Text>
          </>
        )

      )}

    </ScrollView>
  );

}