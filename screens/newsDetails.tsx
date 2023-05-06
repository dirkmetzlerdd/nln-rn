import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { wrapAsHtml } from "../utils/main";
import AutoHeightWebView from "react-native-autoheight-webview";
import { StackScreenProps } from "../types";
import { useTheme } from "@react-navigation/native";

export default function NewsDetails({
  route,
}: StackScreenProps<"NewsDetails">) {
  const { news } = route?.params;
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cardBackground }}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          style={styles.image}
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
        <View style={styles.contentWrapper}>
          <Text style={{ ...styles.header, color: colors.text }}>
            {news.title}
          </Text>
          <AutoHeightWebView
            scrollEnabled={false}
            originWhitelist={["*"]}
            // @ts-ignore
            source={{ html: wrapAsHtml(news.text, colors.text) }}
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
  contentWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  header: {
    paddingVertical: 10,
    textTransform: "uppercase",
    fontSize: 24,
  },
  image: {
    width: "100%",
    height: 300,
  },
});
