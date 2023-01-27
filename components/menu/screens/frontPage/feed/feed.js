import { styles, textColors, menyStyles } from "../../../../../style";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { GetFeed } from "../../../../../backend/backendCalls";
import { useEffect, useState } from "react";
import { extractTimestamp } from "../../../../../helpers/dateTimeFunctions";
import { navigateToRoom } from "../../../../../contexts/rootNavigation";
import { useDispatch } from "react-redux";
import { loadRoomData } from "../../../../../redux/roomSlice";
import { Popup } from "../../../../smart/popup";
import { ShortenText } from "../../../../../helpers/helpers";

export const Feed = () => {

  const [feed, setFeed] = useState([]);
  const [opening, setOpening] = useState(false);
  const dispatch = useDispatch();

  const loadFeed = async () => {

    const loadedFeed = await GetFeed();
    if (loadedFeed) setFeed(loadedFeed);

  }

  const OpenCamp = async (roomId) => {
    setOpening(true);
    await dispatch(loadRoomData({ id: roomId }));
    setOpening(false);
    navigateToRoom(roomId);
  }

  useEffect(() => { loadFeed(); }, []);

  return (
    <>
      {
        feed.length > 0 && feed.map((post, i) => (
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
                {ShortenText(post.scenario, 60, '...')}
              </Text>

              <Text style={[styles.paragraph, textColors.white]}>{extractTimestamp(post.created_at)}</Text>

            </View>
          </TouchableWithoutFeedback>
        ))
      }

      {opening && <Popup loading={true} title='...' />}
    </>
  );

}