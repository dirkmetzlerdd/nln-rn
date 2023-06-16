import { View, StyleSheet } from "react-native";
import { initialize } from "../firebase/main";
import { useAuthContext } from "../context/authContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import ListItem, { ListItemProps } from "./listItem";

const { auth } = initialize();

export default function AccountData() {
  const { user } = useAuthContext();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const data: Array<ListItemProps> = [
    { label: user?.email || "", iconName: undefined, showBottomDivider: true },
    { label: "Notifications", iconName: "right", showBottomDivider: true },
    { label: "My NLN", iconName: "right", showBottomDivider: true },
    {
      label: "Add new service",
      iconName: "right",
      showBottomDivider: true,
      onPress: () => navigation.navigate("AddService"),
    },
    {
      label: "Add news",
      iconName: "right",
      showBottomDivider: true,
      onPress: () => navigation.navigate("AddNews"),
    },
    { label: "Invite", iconName: "right", showBottomDivider: true },
    { label: "Sign Out", iconName: "right", onPress: () => signOut(auth) },
  ];

  return (
    <View
      style={{
        backgroundColor: colors.card,
        ...styles.container,
      }}
    >
      {data.map((item, i) => (
        <ListItem
          key={i}
          label={item.label}
          iconName={item.iconName}
          onPress={item.onPress}
          showBottomDivider={item.showBottomDivider}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
