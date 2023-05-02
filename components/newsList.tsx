import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import NewsPreview from "./newsPreview";

const { firestore } = initialize();

export default function NewsList() {
  const [news, setNews] = useState<Array<News>>([]);

  useEffect(() => {
    onSnapshot(collection(firestore, DB_COLS.news), (snapshot) => {
      const result: Array<News> = snapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as News;
      });
      setNews(result);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {news.map(({ id, imgUrl, text }) => (
          <NewsPreview id={id} imgUrl={imgUrl} text={text} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
