import { Text, TouchableOpacity } from "react-native";
import { toggleServiceSubscription } from "../firebase/user";
import { useAuthContext } from "../context/authContext";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";

export default function SubscribeLabel({ id }: { id: string | undefined }) {
  const { colors } = useTheme();
  const { user } = useAuthContext();
  const isInMyNLN = user && id && user.subscribedToServices?.includes(id);

  if (!user) return null;

  return (
    <TouchableOpacity
      onPress={() => {
        toggleServiceSubscription(id);
      }}
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
  );
}
