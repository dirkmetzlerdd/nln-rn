import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { AppRegistry } from "react-native";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import MainNav from "./components/navigation";
import NewsList from "./screens/newsList";
import Navigation from "./navigation";

//<MainNav style={styles.card} />

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Navigation />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
