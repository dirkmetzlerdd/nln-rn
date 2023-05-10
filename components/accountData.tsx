import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { initialize } from "../firebase/main";
import { useAuthContext } from "../context/authContext";
import { useTheme } from "@react-navigation/native";
import { signOut } from "firebase/auth";

const { auth } = initialize();

export default function AccountData() {
  const { user } = useAuthContext();
  const { colors } = useTheme();

  return (
    <View>
      <Text style={{ marginLeft: 5, marginVertical: 5, fontSize: 18 }}>
        Account
      </Text>
      <View
        style={{
          backgroundColor: colors.card,
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text>{user?.email}</Text>
        <Text>{user?.firstName}</Text>
        <Text>{user?.surname}</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => signOut(auth)}
        style={{
          backgroundColor: colors.primary,
        }}
      >
        <Text
          style={{
            color: colors.background,
          }}
        >
          Sign Out
        </Text>
      </Button>
    </View>
  );
}
