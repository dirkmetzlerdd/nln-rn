import { useReducer } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { NewService } from "../types/service";
import { GeoPoint } from "firebase/firestore";
import { mainStyle } from "../style/main";

type TextInputProps = {
  value: string;
  label: string;
  onChangeText: (v: string) => void;
  multiline?: boolean;
};

export default function TextInputComponent({
  value,
  label,
  onChangeText,
  multiline,
}: TextInputProps) {
  const { colors } = useTheme();

  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder=""
      value={value}
      onChangeText={onChangeText}
      right={<TextInput.Affix />}
      style={{ marginTop: 10 }}
      textColor={colors.text}
      outlineColor="gray"
      activeOutlineColor={colors.text}
      multiline={multiline}
    />
  );
}
