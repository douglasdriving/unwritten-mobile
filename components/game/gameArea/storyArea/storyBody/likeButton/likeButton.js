import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import heartEmpty from '../../../../../../assets/icons/heart_empty.png';
import heartFull from '../../../../../../assets/icons/heart_filled.png';
import { colors2, styles, textColors2 } from '../../../../../../style';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../../../redux/userSlice';
import { Like, Dislike } from '../../../../../../backend/backendFake';

export const LikeButton = ({ likes, nodeId }) => {

  const userId = useSelector(selectUserId);
  const otherLikersCount = (likes.filter(like => (like.user_id != userId)).length);
  const userLikedOnLoad = (likes.filter(like => (like.user_id == userId)).length > 0);

  const [liked, setLiked] = useState(userLikedOnLoad);
  const [count, setCount] = useState(otherLikersCount + (userLikedOnLoad ? 1 : 0));
  const [imageSRC, setImageSRC] = useState(userLikedOnLoad ? heartFull : heartEmpty);
  const [color, setColor] = useState(userLikedOnLoad ? colors2.red : colors2.white);
  const [awaitingLastRequest, setAwaitingLastRequest] = useState(false);

  const HandlePress = async () => {

    if (awaitingLastRequest) return;
    setAwaitingLastRequest(true);

    if (liked) {
      //set to dislike
      setImageSRC(heartEmpty);
      setCount(otherLikersCount);
      setLiked(false);
      setColor(colors2.white);
      await Dislike(nodeId)
    }
    else {
      //set to like
      setImageSRC(heartFull);
      setCount(otherLikersCount + 1);
      setLiked(true);
      setColor(colors2.red);
      await Like(nodeId)
    }

    setAwaitingLastRequest(false);

  }

  return (
    <TouchableWithoutFeedback
      onPress={HandlePress}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Image
          source={imageSRC}
          style={{
            height: 18,
            width: 18,
            alignSelf: 'center'
          }}
        />
        <Text style={[styles.paragraph, { color: color, marginLeft: 5, paddingTop: 5, fontSize: 18 }]}>
          {count}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}