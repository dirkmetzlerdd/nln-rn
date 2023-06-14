import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { StackScreenProps } from "../types";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import ServiceDetailsAboutTab from "../components/serviceDetailsAboutTab";
import ServiceDetailsNewsTab from "../components/serviceDetailsNewsTab";
import { doc, getDoc } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { Service } from "../types/service";

const { firestore } = initialize();

export default function ServiceDetails({
  route,
}: StackScreenProps<"ServiceDetails">) {
  const [activeTab, setActiveTab] = useState<"about" | "news">("about");
  const { serviceId } = route?.params;
  const [service, setService] = useState<Service | null>(null);
  const { colors } = useTheme();

  useEffect(() => {
    (async function () {
      const res = await getDoc(doc(firestore, DB_COLS.service, serviceId));
      const fetchedService = {
        id: res.id,
        ...res.data(),
      } as Service;

      setService(fetchedService);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <Text>{serviceId}</Text>
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
        {activeTab === "about" && service && (
          <ServiceDetailsAboutTab service={service} />
        )}
        {activeTab === "news" && service && (
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
