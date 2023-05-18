import { View } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import { initialize } from "../firebase/main";
import NewsPreview from "./newsPreview";
import { useTheme } from "@react-navigation/native";

const { firestore } = initialize();

export default function ServiceDetailsNewsTab() {
  const [news, setNews] = useState<Array<News>>([]);
  const { colors } = useTheme();

  useEffect(() => {
    // TODO: CURRENT SERVICE ONLY
    onSnapshot(collection(firestore, DB_COLS.news), (snapshot) => {
      const result: Array<News> = snapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as News;
      });
      setNews(result);
    });
  }, []);

  return (
    <View style={{ paddingVertical: 10, backgroundColor: colors.background }}>
      {news.map(({ id, imgUrl, text, title, description }) => (
        <NewsPreview
          key={id}
          id={id}
          imgUrl={imgUrl}
          text={text}
          title={title}
          description={description}
        />
      ))}
    </View>
  );
}
