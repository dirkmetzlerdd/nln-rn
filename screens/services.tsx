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

const { firestore } = initialize();

export default function Services() {
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          mode="outlined"
          label="Find service"
          placeholder=""
          value={search}
          onChangeText={setSearch}
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
        {/* <Button
          mode="contained"
          onPress={() => navigation.navigate("AddService")}
          style={{
            marginTop: 10,
            backgroundColor: colors.primary,
          }}
        >
          <Text
            style={{
              color: colors.background,
            }}
          >
            Add service
          </Text>
        </Button> */}
        <ServicesTable mode="recommended" />
      </ScrollView>
    </View>
  );
}
