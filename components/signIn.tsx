import { useState } from "react";
import {
  GestureResponderEvent,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { initialize } from "../firebase/main";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import TextInputComponent from "./textInput";

const { auth } = initialize();

type SognInProps = {
  switchMode: (event: GestureResponderEvent) => void;
};

export default function SignIn({ switchMode }: SognInProps) {
  const [email, setEmail] = useState("user1@gmail.com");
  const [pw, setPw] = useState("123456");
  const { colors } = useTheme();

  function signInWithEmail() {
    signInWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const fields = [
    {
      id: "email",
      label: "Email",
      value: email,
      onChangeText: setEmail,
    },
    {
      id: "password",
      label: "Password",
      value: pw,
      onChangeText: setPw,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View>
        {fields.map((item) => (
          <TextInputComponent
            key={item.id}
            id={item.id}
            label={item.label}
            value={item.value}
            onChangeText={item.onChangeText}
            multiline={false}
          />
        ))}
        <Button
          mode="contained"
          onPress={signInWithEmail}
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
            Sign In
          </Text>
        </Button>
      </View>
      <TouchableOpacity activeOpacity={1} onPress={switchMode}>
        <Text style={{ paddingVertical: 15 }}>Don't have an account yet?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
