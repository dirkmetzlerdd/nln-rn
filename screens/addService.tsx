import { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import ServicesTable from "../components/servicesTable";

const { firestore } = initialize();

export default function AddService() {
  const [search, setSearch] = useState("");
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <Text>Add service</Text>
    </View>
  );
}
