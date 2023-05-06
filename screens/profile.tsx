import { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { initialize } from "../firebase/main";
import { useAuthContext } from "../context/authContext";
import Login from "./login";

const { firestore } = initialize();

export default function Profile() {
  const { user } = useAuthContext();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text>{user?.email}</Text>
      <Text>{user?.firstName}</Text>
      <Text>{user?.surname}</Text>
      <Login />
    </View>
  );
}
