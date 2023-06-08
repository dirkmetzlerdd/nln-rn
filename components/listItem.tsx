import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Text, Divider } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";

export type ListItemProps = {
  label: string;
  iconName?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  showBottomDivider?: boolean;
};

export default function ListItem({
  label,
  iconName,
  onPress,
  showBottomDivider,
}: ListItemProps) {
  const { colors } = useTheme();

  return (
    <>
      <TouchableOpacity style={styles.menuLine} onPress={onPress}>
        <Text style={styles.menuLineText}>{label}</Text>
        {iconName ? (
          <Icon name={iconName} size={20} style={{ color: colors.text }} />
        ) : null}
      </TouchableOpacity>
      {showBottomDivider ? <Divider /> : null}
    </>
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
