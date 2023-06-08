import { useNavigation, useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Service } from "../types/service";
import { toggleServiceSubscription } from "../firebase/user";
import { useAuthContext } from "../context/authContext";
import Map from "./maps";
import SubscribeLabel from "./subscribeLabel";

export default function ServicesOverviewCard({
  name,
  description,
  id,
  geopoint,
}: Partial<Service>) {
  const { colors } = useTheme();
  const { user } = useAuthContext();
  const navigation = useNavigation();

  console.log(user);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
      }}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("ServiceDetails", {
          service: { name, description, id, geopoint },
        })
      }
    >
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 10,
          flexDirection: "row",
          marginBottom: 10,
          overflow: "hidden",
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
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
            }}
          >
            {description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <SubscribeLabel id={id} />
          </View>
        </View>
      </View>
      {geopoint ? <Map geopoint={geopoint} pointerEvents="none" /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
  },
});
