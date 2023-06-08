import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import SubscribeLabel from "../components/subscribeLabel";
import Map from "./map";
import { Service } from "../types/service";
import { mainStyle } from "../style/main";

export default function ServiceDetailsAboutTab({
  service,
}: {
  service: Partial<Service>;
}) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.container}>
        <SubscribeLabel id={service.id} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={{ ...styles.header, color: colors.text }}>
          {service.name}
        </Text>
        <Text
          style={{
            ...styles.description,
            color: colors.text,
          }}
        >
          {service.description}
        </Text>
      </View>

      {service.geopoint ? (
        <Map geopoint={service.geopoint} height={300} pointerEvents="none" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "flex-end", margin: 10 },
  contentWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  description: {
    fontSize: mainStyle.fontM,
  },
  header: {
    paddingBottom: 10,
    textTransform: "uppercase",
    fontSize: 24,
  },
});
