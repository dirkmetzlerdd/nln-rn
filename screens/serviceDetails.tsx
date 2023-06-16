import { View, ScrollView, StyleSheet, Image, Text } from "react-native";
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
import Tabs from "../components/tabs";

const { firestore } = initialize();

export default function ServiceDetails({
  route,
}: StackScreenProps<"ServiceDetails">) {
  const [activeTab, setActiveTab] = useState<string>("About");
  const [service, setService] = useState<Service | null>(null);
  const { serviceId } = route?.params;
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
            uri: service?.imgUrl,
          }}
        />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tab1="About"
          tab2="News"
        />
        <Divider />
        {activeTab === "About" && service && (
          <ServiceDetailsAboutTab service={service} />
        )}
        {activeTab === "News" && service && (
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
