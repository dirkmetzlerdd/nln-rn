import { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { initialize } from "../firebase/main";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { addProfile } from "../firebase/user";

const { auth } = initialize();

export default function SignUp({ goToSignIn }) {
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
          label="Firstname"
          placeholder=""
          value={firstName}
          onChangeText={setFirstName}
          right={<TextInput.Affix />}
          style={{ marginTop: 10 }}
          textColor={colors.text}
          outlineColor="gray"
          activeOutlineColor={colors.text}
        />
        <TextInput
          mode="outlined"
          label="Surname"
          placeholder=""
          value={surname}
          onChangeText={setSurname}
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
      <TouchableOpacity activeOpacity={1} onPress={goToSignIn}>
        <Text style={{ paddingVertical: 15 }}>Already have an account?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
