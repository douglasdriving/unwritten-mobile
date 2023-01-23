import { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native"
import { StoryList } from "../../../modularComponents/storyList/storylist";
import { styles, textColors } from "../../../../../style";

export const CampList = (props) => {

  const [rooms, setRooms] = useState([]);
  const { roomQuery, title, description, confirmJoinRequired, joinButtonText, alternativeText } = props;

  const LoadRooms = async () => {

    const loadedRooms = await roomQuery();
    setRooms(loadedRooms);

  }

  const roomsExists = () => {
    return (rooms && rooms.length > 0);
  }

  useEffect(() => {
    LoadRooms();
  }, [])

  return (
    <View style={{ marginTop: 15 }}>

      <Text style={[styles.h2, textColors.white]}>{title}</Text>

      <Text style={[styles.paragraph, textColors.white]}>
        {roomsExists() ? description : alternativeText}
      </Text>

      {
        roomsExists() &&
        <StoryList
          listItemInfo={rooms.map(room => ({
            title: room.title,
            description: room.description,
            creator: room.creator,
            roomId: room.id,
            buttonText: joinButtonText
          }))}
          confirmJoin={confirmJoinRequired}
        />
      }

    </View>
  )

}