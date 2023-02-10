import { Text } from "react-native";
import { styles, textColors2 } from "../../../../../style";
import { Space } from "../../../../smart/visuals";
import { MyButton } from "../../../../smart/myButton";
import { useState } from "react";
import { AddNode } from "../../../../../backend/backendCalls";
import { loadRoomData, selectRoomId } from "../../../../../redux/roomSlice";
import { useSelector, useDispatch } from "react-redux";

export const CanWriteField = () => {

  const [loading, setLoading] = useState(false);
  const [failedUpload, setFailedUpload] = useState(null);
  const campId = useSelector(selectRoomId);
  const dispatch = useDispatch();

  const HandleButtonPress = async () => {

    setLoading(true);
    const addNodeResponse = await AddNode(campId);
    if (addNodeResponse.ok) {
      await dispatch(loadRoomData({ id: campId }));
    }
    else {
      setFailedUpload(addNodeResponse.message);
    }
    setLoading(false);

  }

  const ReloadStory = async () => {

    setFailedUpload(false);
    setLoading(true);
    await dispatch(loadRoomData({ id: campId }));
    setLoading(false);

  }

  return (
    <>

      {
        !loading &&
        <>
          <MyButton
            flex
            title={failedUpload ? 'Reload Story' : 'Continue Story'}
            onPress={failedUpload ? ReloadStory : HandleButtonPress}
          />
          {Space(5)}
        </>
      }

      {!failedUpload &&
        <Text style={[styles.paragraph, textColors2.light, styles.textCenter]}>
          {loading ? '...' : 'You will have 20 minutes to add a new paragraph'}
        </Text>
      }

      {(failedUpload && !loading) &&
        <Text style={[styles.paragraph, textColors2.red, styles.textCenter]}>
          {failedUpload}. Please try to reload it.
        </Text>
      }

    </>
  );
}