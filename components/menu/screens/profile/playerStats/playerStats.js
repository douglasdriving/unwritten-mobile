import { useEffect } from "react";
import { useState } from "react"
import { Text } from "react-native"
import { styles, textColors2 } from "../../../../../style";
import { GetPlayerStats } from "../../../../../backend/backendCalls";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../../../redux/userSlice";

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

  return (
    <>
      <Text style={[styles.paragraph, textColors2.white]}>
        Contributions: {stats ? stats.contributions : '...'}
      </Text>
      <Text style={[styles.paragraph, textColors2.white]}>
        Camps: {stats ? stats.camps : '...'}
      </Text>
      <Text style={[styles.paragraph, textColors2.white]}>
        Finished Stories: {stats ? stats.finished : '...'}
      </Text>
    </>
  )

}