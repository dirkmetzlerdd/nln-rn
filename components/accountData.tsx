import { View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Text, Button, Divider } from "react-native-paper";
import { initialize } from "../firebase/main";
import { useAuthContext } from "../context/authContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/AntDesign";

const { auth } = initialize();

export default function AccountData() {
  const { user } = useAuthContext();
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <View style={styles.menuLine}>
        <Text style={styles.menuLineText}>
          {user?.firstName} {user?.surname}
        </Text>
      </View>
      <Divider />
      <View style={styles.menuLine}>
        <Text style={styles.menuLineText}>{user?.email}</Text>
      </View>
      <Divider />
      <TouchableOpacity style={styles.menuLine}>
        <Text style={styles.menuLineText}>Notification</Text>
        <Icon name={"right"} size={20} style={{ color: colors.text }} />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.menuLine}>
        <Text style={styles.menuLineText}>My NLN</Text>
        <Icon name={"right"} size={20} style={{ color: colors.text }} />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.menuLine}>
        <Text style={styles.menuLineText}>Invite</Text>
        <Icon name={"right"} size={20} style={{ color: colors.text }} />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.menuLine} onPress={() => signOut(auth)}>
        <Text style={styles.menuLineText}>Sign Out</Text>
        <Icon name={"right"} size={20} style={{ color: colors.text }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuLine: {
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  menuLineText: {
    fontSize: 18,
  },
});
