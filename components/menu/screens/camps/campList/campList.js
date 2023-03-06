import { useEffect, useCallback } from "react";
import { useState } from "react";
import { Text, View } from "react-native"
import { StoryList } from "../../../modularComponents/storyList/storylist";
import { styles, textColors, textColors2 } from "../../../../../style";
import { useFocusEffect } from "@react-navigation/native";

export const CampList = (props) => {

  const [rooms, setRooms] = useState([]);
  const {
    roomQuery,
    title,
    description,
    confirmJoinRequired,
    joinButtonText,
    alternativeText,
    hideIfEmpty,
    emptyText
  } = props;

  const LoadRooms = async () => {

    const loadedRooms = await roomQuery();
    setRooms(loadedRooms);

  }

  const roomsExists = () => {
    return (rooms && rooms.length > 0);
  }

  useFocusEffect(
    useCallback(() => {
      LoadRooms();
    }, [])
  );

  if (hideIfEmpty && !roomsExists()) {
    return;
  }

  return (
    <View style={{ marginTop: 15, flex: 1 }}>

      <Text style={[styles.h2, textColors2.white]}>{title}</Text>

      {
        (description && roomsExists()) && (
          <Text style={[styles.paragraph, textColors2.white]}>
            {description}
          </Text>
        )
      }

      {
        true &&
        <StoryList
          listItemInfo={rooms.map(room => ({
            title: room.title,
            description: room.description,
            creator: room.creator,
            roomId: room.id,
            buttonText: joinButtonText
          }))}
          confirmJoin={confirmJoinRequired}
          alternativeText={alternativeText}
        />
      }

    </View>
  )

}