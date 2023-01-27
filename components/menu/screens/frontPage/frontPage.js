import { styles, textColors, colors, menyStyles } from "../../../../style";
import { ScrollView, Text, View, TouchableWithoutFeedback } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { GetFeed } from "../../../../backend/backendCalls";
import { useEffect } from "react";
import { Divider, Space } from "../../../smart/visuals";
import { extractTimestamp } from "../../../../helpers/dateTimeFunctions";
import { navigateToRoom } from "../../../../contexts/rootNavigation";
import { useDispatch } from "react-redux";
import { loadRoomData } from "../../../../redux/roomSlice";
import { Popup } from "../../../smart/popup";

export const FrontPage = () => {

  const [feed, setFeed] = useState([]);
  const [opening, setOpening] = useState(false);
  const dispatch = useDispatch();

  const loadFeed = async () => {

    console.lo

    const loadedFeed = await GetFeed();
    if (loadedFeed) setFeed(loadedFeed);

  }

  const shortenText = (text, maxChars) => {

    if (text.length < 50) return text;
    else {
      let shortText = text.slice(0, maxChars);
      shortText += '...';
      return shortText;
    }

  }

  const OpenCamp = async (roomId) => {
    setOpening(true);
    await dispatch(loadRoomData({ id: roomId }));
    setOpening(false);
    navigateToRoom(roomId);
  }

  useEffect(() => { loadFeed(); }, []);

  return (
    <ScrollView style={styles.menuPageContainer}>

      {opening && <Popup loading={true} title='...' />}

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

      {feed.length > 0 && feed.map((post, i) => (
        <TouchableWithoutFeedback key={i} onPress={() => {
          OpenCamp(post.room_id);
        }}>
          <View style={menyStyles.feedItem}>

            <Text style={[styles.h3, textColors.white]}>
              {post.story_title}
            </Text>

            <Text style={[styles.paragraph, textColors.white]}>
              {post.creator_name}:
            </Text>

            <Text style={[styles.paragraph, textColors.white, styles.italic]}>
              {shortenText(post.scenario, 60)}
            </Text>

            <Text style={[styles.paragraph, textColors.white]}>{extractTimestamp(post.created_at)}</Text>

          </View>
        </TouchableWithoutFeedback>
      ))}

      {Space(100)}

    </ScrollView>
  );

}