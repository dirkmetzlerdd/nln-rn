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
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

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

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder=""
          value={email}
          onChangeText={setEmail}
          right={<TextInput.Affix />}
          style={{ marginTop: 10 }}
          textColor={colors.text}
          outlineColor="gray"
          activeOutlineColor={colors.text}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder=""
          value={pw}
          onChangeText={setPw}
          right={<TextInput.Affix />}
          style={{ marginTop: 10 }}
          textColor={colors.text}
          outlineColor="gray"
          activeOutlineColor={colors.text}
        />
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
