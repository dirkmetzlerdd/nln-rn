import { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import NewsPreview from "../components/newsPreview";

const { firestore } = initialize();

export default function NewsList({ navigation }: any) {
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
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {news.map(({ id, imgUrl, text, title, description }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NewsDetails", {
                news: { id, imgUrl, text, title, description },
              })
            }
            key={id}
          >
            <NewsPreview
              key={id}
              id={id}
              imgUrl={imgUrl}
              text={text}
              title={title}
              description={description}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
