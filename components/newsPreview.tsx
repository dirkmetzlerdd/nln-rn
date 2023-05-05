import {
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Image,
} from "react-native";
import { News } from "../types/news";
import { Card, Text } from "react-native-paper";
import AutoHeightWebView from "react-native-autoheight-webview";
import { wrapAsHtml } from "../utils/main";

export default function NewsPreview({
  title,
  text,
  imgUrl,
  description,
}: Partial<News>) {
  const { width, height } = useWindowDimensions();

  return (
    <Card style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: "https://picsum.photos/700",
        }}
      />
      <Card.Content>
        <Text style={styles.header}>{title}</Text>
        <AutoHeightWebView
          scrollEnabled={false}
          originWhitelist={["*"]}
          source={{ html: wrapAsHtml(description) }}
          style={{
            width: Dimensions.get("window").width,
          }}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 10, marginHorizontal: 5, overflow: "hidden" },
  header: {
    paddingVertical: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
