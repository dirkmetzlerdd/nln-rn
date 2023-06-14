import { useReducer } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { mainStyle } from "../style/main";

export default function AddServiceStepTwo() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: mainStyle.fontXL }}>Add address</Text>
    </SafeAreaView>
  );
}
