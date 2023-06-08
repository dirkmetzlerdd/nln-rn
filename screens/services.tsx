import { useState } from "react";
import { View, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import ServicesTable from "../components/servicesTable";
import { mainStyle } from "../style/main";

export default function Services() {
  const [search, setSearch] = useState("");
  const { colors } = useTheme();

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
        <ServicesTable mode="nearby" />
      </ScrollView>
    </View>
  );
}
