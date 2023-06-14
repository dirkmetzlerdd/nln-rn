import { useNavigation, useTheme } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Service } from "../types/service";
import Map from "./map";
import SubscribeLabel from "./subscribeLabel";
import { mainStyle } from "../style/main";

export default function ServicesOverviewCard({
  name,
  description,
  id,
  geopoint,
}: Partial<Service>) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: colors.card,
      }}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("ServiceDetails", {
          serviceId: id || "",
        })
      }
    >
      {geopoint ? <Map geopoint={geopoint} pointerEvents="none" /> : null}
      <View
        style={{
          ...styles.wrapper,
          backgroundColor: colors.card,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
        <View
          style={{
            padding: 10,
            maxWidth: Dimensions.get("window").width - 100,
          }}
        >
          <Text
            style={{
              color: colors.text,
              ...styles.title,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: colors.text,
              ...styles.text,
            }}
          >
            {description}
          </Text>
          <View style={styles.labelContainer}>
            <SubscribeLabel id={id} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  wrapper: {
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: mainStyle.fontXL,
    fontWeight: "bold",
  },
  text: {
    fontSize: mainStyle.fontM,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  labelContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});
