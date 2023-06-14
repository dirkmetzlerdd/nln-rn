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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import ServiceDetailsAboutTab from "../components/serviceDetailsAboutTab";
import ServiceDetailsNewsTab from "../components/serviceDetailsNewsTab";
import { doc, getDoc } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { Service } from "../types/service";

type TabsProps = {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
  tab1: string;
  tab2: string;
};

export default function Tabs({
  setActiveTab,
  activeTab,
  tab1,
  tab2,
}: TabsProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab(tab1)}>
        <Text
          style={{
            color: activeTab === tab1 ? colors.text : "grey",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {tab1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab(tab2)}>
        <Text
          style={{
            color: activeTab === tab2 ? colors.text : "grey",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {tab2}
        </Text>
      </TouchableOpacity>
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
});
