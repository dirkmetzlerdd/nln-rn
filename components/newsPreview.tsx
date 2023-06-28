import { StyleSheet, Image, View } from "react-native";
import { News } from "../types/news";
import { Text } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { mainStyle } from "../style/main";

export default function NewsPreview({
  title,
  imgUrl,
  description,
  createdAt,
}: Partial<News>) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: colors.card,
      }}
    >
      {imgUrl ? (
        <Image
          style={styles.image}
          source={{
            uri: imgUrl,
          }}
        />
      ) : null}
      <View style={styles.cardText}>
        <Text style={{ ...styles.header, color: colors.text }}>{title}</Text>
        <Text style={{ color: colors.text }}>{description}</Text>
        {createdAt ? (
          <Text style={{ ...styles.createdAt, color: colors.secondaryText }}>
            {createdAt.toDate().toLocaleString()}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginHorizontal: mainStyle.mainScreenSpace,
    overflow: "hidden",
    borderRadius: mainStyle.rounded,
  },
  header: {
    paddingVertical: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: mainStyle.fontXL,
  },
  cardText: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  createdAt: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
});
