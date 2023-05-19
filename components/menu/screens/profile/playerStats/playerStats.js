import { useEffect, useState, useCallback } from "react";
import { Text } from "react-native"
import { styles, textColors2 } from "../../../../../style";
import { GetPlayerStats } from "../../../../../backend/backendFake";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../../../redux/userSlice";
import { useFocusEffect } from "@react-navigation/native";

export const PlayerStats = () => {

  const userId = useSelector(selectUserId);
  const [stats, setStats] = useState();

  const LoadStats = async () => {

    const results = await GetPlayerStats(userId);
    if (results.ok) {
      setStats(results.data)
    }

  }

  useEffect(() => { LoadStats(); }, [])

  useFocusEffect(
    useCallback(() => {
      LoadStats();
    }, [])
  );

  return (
    <>
      <Text style={[styles.paragraph, textColors2.white]}>
        Contributions: {stats ? stats.contributions : '...'}
      </Text>
      <Text style={[styles.paragraph, textColors2.white]}>
        Camps: {stats ? stats.camps : '...'}
      </Text>
      <Text style={[styles.paragraph, textColors2.white]}>
        Finished Stories: {(stats) ? (stats.finished ? stats.finished : '0') : '...'}
      </Text>
    </>
  )

}