import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./navigation";
import { AuthContextProvider } from "./context/authContext";

//<MainNav style={styles.card} />

export default function App() {
  useEffect(() => {
    console.log("____CHECK USER AND REDIRECT");
  }, []);

  return (
    <PaperProvider>
      <AuthContextProvider>
        <View style={styles.container}>
          <Navigation />
        </View>
      </AuthContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
