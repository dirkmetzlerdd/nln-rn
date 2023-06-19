import { useState } from "react";
import {
  GestureResponderEvent,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { initialize } from "../firebase/main";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import { addProfile } from "../firebase/user";
import TextInputComponent from "./textInput";

const { auth } = initialize();

type SognUpProps = {
  switchMode: (event: GestureResponderEvent) => void;
};

export default function SignUp({ switchMode }: SognUpProps) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { colors } = useTheme();

  function register() {
    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          addProfile({ firstName, surname, email });
        }
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
      id: "firstname",
      label: "Firstname",
      value: firstName,
      onChangeText: setFirstName,
    },
    {
      id: "surname",
      label: "Surname",
      value: surname,
      onChangeText: setSurname,
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
          onPress={register}
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
            Sign Up
          </Text>
        </Button>
      </View>
      <TouchableOpacity activeOpacity={1} onPress={switchMode}>
        <Text style={{ paddingVertical: 15 }}>Already have an account?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
