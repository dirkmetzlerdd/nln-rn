import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { StackScreenProps } from "../types";
import { useTheme } from "@react-navigation/native";
import SubscribeLabel from "../components/subscribeLabel";
import Map from "../components/maps";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import { initialize } from "../firebase/main";
import NewsPreview from "../components/newsPreview";
import { Divider } from "react-native-paper";
import ServiceDetailsAboutTab from "../components/serviceDetailsAboutTab";
import ServiceDetailsNewsTab from "../components/serviceDetailsNewsTab";

const { firestore } = initialize();

export default function ServiceDetails({
  route,
}: StackScreenProps<"ServiceDetails">) {
  const [activeTab, setActiveTab] = useState<"about" | "news">("about");
  const { service } = route?.params;
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          style={styles.image}
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("about")}
          >
            <Text
              style={{
                color: activeTab === "about" ? colors.text : "grey",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("news")}
          >
            <Text
              style={{
                color: activeTab === "news" ? colors.text : "grey",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              News
            </Text>
          </TouchableOpacity>
        </View>
        <Divider />
        {activeTab === "about" && <ServiceDetailsAboutTab service={service} />}
        {activeTab === "news" && (
          <ServiceDetailsNewsTab serviceId={service.id} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: { flexDirection: "row" },
  tab: {
    width: "50%",
    padding: 15,
  },
  container: { flex: 1 },
  contentWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  header: {
    paddingBottom: 10,
    textTransform: "uppercase",
    fontSize: 24,
  },
  image: {
    width: "100%",
    height: 150,
  },
});
