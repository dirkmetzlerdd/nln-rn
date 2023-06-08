import { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import ServicesTable from "../components/servicesTable";
import { useNavigation } from "@react-navigation/native";
import { mainStyle } from "../style/main";

const { firestore } = initialize();

export default function Services() {
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginHorizontal: mainStyle.mainScreenSpace }}>
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          mode="outlined"
          label="Find service"
          placeholder=""
          value={search}
          onChangeText={setSearch}
          left={<TextInput.Icon icon="loupe" />}
          right={
            search ? (
              <TextInput.Icon icon="delete" onPress={() => setSearch("")} />
            ) : null
          }
          style={{ marginTop: 10 }}
          textColor={colors.text}
          outlineColor="gray"
          activeOutlineColor={colors.text}
        />
        <ServicesTable mode="recommended" />
      </ScrollView>
    </View>
  );
}
