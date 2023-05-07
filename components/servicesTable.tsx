import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { Service } from "../types/service";
import Icon from "react-native-vector-icons/AntDesign";
import ServicesOverviewCard from "./serviceCard";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";

const { firestore } = initialize();

interface ServicesTableProps {
  mode: "search" | "recommended";
}
export default function ServicesTable({ mode }: ServicesTableProps) {
  const [services, setServices] = useState<Array<Service>>([]);
  const { colors } = useTheme();

  useEffect(() => {
    onSnapshot(collection(firestore, DB_COLS.service), (snapshot) => {
      const result: Array<Service> = snapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as Service;
      });

      setServices(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.title,
          color: colors.text,
        }}
      >
        Recomended Services for you:
      </Text>
      {services.map(({ name, description }) => (
        <ServicesOverviewCard name={name} description={description} />
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
