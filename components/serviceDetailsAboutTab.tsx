import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import SubscribeLabel from "../components/subscribeLabel";
import Map from "./map";
import { Service } from "../types/service";

export default function ServiceDetailsAboutTab({
  service,
}: {
  service: Partial<Service>;
}) {
  const { colors } = useTheme();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 10,
        }}
      >
        <SubscribeLabel id={service.id} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={{ ...styles.header, color: colors.text }}>
          {service.name}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
          }}
        >
          {service.description}
        </Text>
      </View>

      {service.geopoint ? (
        <Map geopoint={service.geopoint} height={300} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  header: {
    paddingBottom: 10,
    textTransform: "uppercase",
    fontSize: 24,
  },
});
