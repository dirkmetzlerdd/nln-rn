import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Service } from "../types/service";

export default function ServicesOverviewCard({
  name,
  description,
}: Partial<Service>) {
  const { colors } = useTheme();
  const [isInMyNLN, toggleIsInMyNLN] = useState(false);

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 10,
        flexDirection: "row",
        marginBottom: 10,
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://picsum.photos/700",
        }}
      />
      <View
        style={{
          padding: 10,
          maxWidth: Dimensions.get("window").width - 100,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
          }}
        >
          {description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => toggleIsInMyNLN(!isInMyNLN)}
            style={{
              flexDirection: "row",
              borderColor: isInMyNLN ? colors.text : colors.primary,
              borderRadius: 5,
              borderWidth: 1,
              padding: 5,
            }}
          >
            <Icon
              name={isInMyNLN ? "checkcircleo" : "pluscircleo"}
              size={15}
              color={isInMyNLN ? colors.text : colors.primary}
            />
            <Text
              style={{
                color: isInMyNLN ? colors.text : colors.primary,
                marginLeft: 5,
              }}
            >
              {isInMyNLN ? "IS IN MY NLN" : "ADD TO MY NLN"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
  },
});
