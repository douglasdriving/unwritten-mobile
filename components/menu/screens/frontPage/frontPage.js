import { styles, textColors, colors } from "../../../../style";
import { ScrollView, Text, View } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { GetFeed } from "../../../../backend/backendCalls";
import { useEffect } from "react";
import { Divider } from "../../../smart/visuals";
import { extractTimestamp } from "../../../../helpers/dateTimeFunctions";

export const FrontPage = () => {

  const [feed, setFeed] = useState([]);

  const loadFeed = async () => {

    const loadedFeed = await GetFeed();
    if (loadedFeed) setFeed(loadedFeed);

  }

  const shortenText = (text) => {

    if (text.length < 50) return text;
    else {
      let shortText = text.slice(0, 80);
      shortText += '...';
      return shortText;
    }

  }

  useEffect(() => { loadFeed(); }, []);

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

      {feed.length > 0 && feed.map((post, i) => (
        <View key={i}>
          <Divider color={colors.white} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.body, styles.bold, textColors.white]}>{post.creator_name + ' '}</Text>
            <Text style={[styles.paragraph, textColors.white]}>{'(' + extractTimestamp(post.created_at) + ')'}</Text>
          </View>
          <Text style={[styles.paragraph, textColors.white]}>
            Added to "{post.story_title}"
            :
          </Text>
          <Text style={[styles.paragraph, textColors.white]}>
            {shortenText(post.scenario)}
          </Text>
        </View>
      ))}

    </ScrollView>
  );

}