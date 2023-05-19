import { styles, textColors2 } from "../../../../../style";
import { Text } from "react-native";
import { GetNews } from "../../../../../backend/backendFake";
import { useEffect, useState } from "react";
import { convertGMTToLocalTime, extractTimestamp } from "../../../../../helpers/dateTimeFunctions";

export const News = () => {

  const [news, setNews] = useState(null);

  const LoadNews = async () => {

    const loadedNews = await GetNews();
    setNews(loadedNews);

  }

  useEffect(() => { LoadNews(); }, []);

  return (
    <>
      <Text style={[styles.h2, textColors2.white]}>
        Update
      </Text>

      {news &&
        <>
          <Text style={[styles.paragraph, textColors2.white]}>
            {news.message}
          </Text>

          <Text style={[styles.paragraph, textColors2.light]}>
            {news.author}
          </Text>

          <Text style={[styles.paragraph, textColors2.light]}>
            {extractTimestamp(convertGMTToLocalTime(news.created_at))}
          </Text>
        </>
      }

    </>
  );

}