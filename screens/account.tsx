import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAuthContext } from "../context/authContext";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import AccountData from "../components/accountData";

export default function Account() {
  const [mode, setMode] = useState<"account" | "signin" | "signup">("account");
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && mode !== "account") setMode("account");
    if (!user && !["signin", "signup"].includes(mode)) setMode("signin");
  });

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {mode === "account" && <AccountData />}
      {mode === "signin" && <SignIn goToSignUp={() => setMode("signup")} />}
      {mode === "signup" && <SignUp goToSignIn={() => setMode("signin")} />}
    </View>
  );
}
