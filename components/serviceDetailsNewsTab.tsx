import { View } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import { initialize } from "../firebase/main";
import NewsPreview from "./newsPreview";
import { useTheme } from "@react-navigation/native";
import { useAuthContext } from "../context/authContext";

const { firestore } = initialize();

export default function ServiceDetailsNewsTab({
  serviceId,
}: {
  serviceId: string;
}) {
  const { user, news } = useAuthContext();
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
