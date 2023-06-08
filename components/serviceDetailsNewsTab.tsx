import { View } from "react-native";
import NewsPreview from "./newsPreview";
import { useTheme } from "@react-navigation/native";
import { useAuthContext } from "../context/authContext";

export default function ServiceDetailsNewsTab({
  serviceId,
}: {
  serviceId: string | undefined;
}) {
  const { news } = useAuthContext();
  const { colors } = useTheme();

  return (
    <View style={{ paddingVertical: 10, backgroundColor: colors.background }}>
      {news
        .filter((item) => item.serviceId === serviceId)
        .map(({ id, imgUrl, text, title, description }) => (
          <NewsPreview
            key={id}
            id={id}
            imgUrl={imgUrl}
            text={text}
            title={title}
            description={description}
          />
        ))}
    </View>
  );
}
