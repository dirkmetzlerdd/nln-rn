import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import { wrapAsHtml } from "../utils/main";
import AutoHeightWebView from "react-native-autoheight-webview";
import { StackScreenProps } from "../types";

const { firestore } = initialize();

export default function NewsDetails({
  route,
}: StackScreenProps<"NewsDetails">) {
  const [newsData, setNewsData] = useState<Array<News>>([]);
  const { news } = route?.params;

  useEffect(() => {
    onSnapshot(collection(firestore, DB_COLS.news), (snapshot) => {
      const result: Array<News> = snapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as News;
      });
      setNewsData(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          style={styles.image}
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
        <View style={styles.contentWrapper}>
          <Text style={styles.header}>{news.title}</Text>
          <AutoHeightWebView
            scrollEnabled={false}
            originWhitelist={["*"]}
            // @ts-ignore
            source={{ html: wrapAsHtml(news.text) }}
            style={{
              width: Dimensions.get("window").width,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: { padding: 15, marginBottom: 15 },
  header: {
    paddingVertical: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 22,
  },
  image: {
    width: "100%",
    height: 300,
  },
});
