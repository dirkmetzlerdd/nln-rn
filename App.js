import { useEffect } from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./navigation";
import { AuthContextProvider } from "./context/authContext";

export default function App() {
  useEffect(() => {
    console.log("____CHECK USER AND REDIRECT");
  }, []);

  return (
    <PaperProvider>
      <AuthContextProvider>
        <View style={{ flex: 1 }}>
          <Navigation />
        </View>
      </AuthContextProvider>
    </PaperProvider>
  );
}
