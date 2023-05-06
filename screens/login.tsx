import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { initialize } from "../firebase/main";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as SecureStore from "expo-secure-store";

import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

const { auth } = initialize();

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("user2@gmail.com");
  const [pw, setPw] = useState("123456");
  const { colors } = useTheme();

  function register() {
    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        save("email", email);
        save("pw", pw);

        // addProfile({ firstname: "YYY", surname: "XXX" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  function login() {
    console.log("signin");
    signInWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          setUser(user);
          save("email", email);
          save("pw", pw);
          console.log("user:");
          console.log(user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ padding: 10 }}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder=""
          value={email}
          onChangeText={setEmail}
          right={<TextInput.Affix />}
          style={{ marginTop: 10 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder=""
          value={pw}
          onChangeText={setPw}
          right={<TextInput.Affix />}
          style={{ marginTop: 10 }}
        />
        <Button
          mode="contained"
          onPress={login}
          style={{
            marginTop: 10,
            backgroundColor: colors.primary,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
            }}
          >
            Sign In
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
