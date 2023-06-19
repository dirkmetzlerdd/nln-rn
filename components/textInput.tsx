import { useReducer } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { NewService } from "../types/service";
import { GeoPoint } from "firebase/firestore";
import { mainStyle } from "../style/main";

type TextInputProps = {
  id: string;
  value: string;
  label: string;
  onChangeText: (v: string) => void;
  removeKeyFromErrorKeys?: (v: string) => void;
  multiline?: boolean;
  error?: boolean;
};

export default function TextInputComponent({
  id,
  value,
  label,
  onChangeText,
  removeKeyFromErrorKeys,
  multiline,
  error,
}: TextInputProps) {
  const { colors } = useTheme();

  return (
    <TextInput
      error={error}
      mode="outlined"
      label={label}
      placeholder=""
      value={value}
      onChangeText={(v) => {
        if (error && removeKeyFromErrorKeys) removeKeyFromErrorKeys(id);
        onChangeText(v);
      }}
      right={<TextInput.Affix />}
      style={{ marginTop: 10 }}
      textColor={colors.text}
      outlineColor="gray"
      activeOutlineColor={colors.text}
      multiline={multiline}
    />
  );
}
