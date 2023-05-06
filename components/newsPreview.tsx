import {
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Image,
  View,
} from "react-native";
import { News } from "../types/news";
import { Card, Text } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

export default function NewsPreview({
  title,
  text,
  imgUrl,
  description,
}: Partial<News>) {
  const { colors } = useTheme();

  return (
    <Card
      style={{
        ...styles.card,
        backgroundColor: colors.cardBackground,
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://picsum.photos/700",
        }}
      />
      <Card.Content>
        <Text style={{ ...styles.header, color: colors.text }}>{title}</Text>
        <Text style={{ color: colors.text }}>{description}</Text>
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
