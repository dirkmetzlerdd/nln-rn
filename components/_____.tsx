import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const MainNav = () => {
  return (
    <SafeAreaView>
      <Card style={styles.card} onPress={() => console.log("pressed card")}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>

        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default MainNav;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 5,
    marginVertical: 5,
  },
});
