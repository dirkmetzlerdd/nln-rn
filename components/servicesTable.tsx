import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Service } from "../types/service";
import ServicesOverviewCard from "./serviceCard";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { getMyServices } from "../firebase/service";

const { firestore } = initialize();

type ServicesTableProps = {
  mode: "search" | "nearby" | "my";
};

export default function ServicesTable({ mode }: ServicesTableProps) {
  const [services, setServices] = useState<Array<Service>>([]);
  const { colors } = useTheme();

  useEffect(() => {
    if (mode === "my") {
      (async function () {
        const result = await getMyServices();
        setServices(result || []);
      })();
    }

    if (mode === "nearby") {
      // TODO snapshot here??
      onSnapshot(collection(firestore, DB_COLS.service), (snapshot) => {
        const result: Array<Service> = snapshot.docs.map((item) => {
          return { id: item.id, ...item.data() } as Service;
        });

        setServices(result);
      });
    }
  }, []);

  if (!services.length) return null;

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.title,
          color: colors.text,
        }}
      >
        Nearby:
      </Text>
      {services.map(({ name, description, id, geopoint }) => (
        <ServicesOverviewCard
          name={name}
          description={description}
          id={id}
          key={id}
          geopoint={geopoint}
        />
      ))}
    </View>
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
