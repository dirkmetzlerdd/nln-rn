import { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { Modal, Portal, Text, Chip, Provider } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";
import { initialize } from "../firebase/main";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import NewsPreview from "../components/newsPreview";
import Icon from "react-native-vector-icons/AntDesign";

const { firestore } = initialize();

export default function NewsList({ navigation }: any) {
  const [news, setNews] = useState<Array<News>>([]);
  const [visible, setVisible] = useState(false);

  const containerStyle = { backgroundColor: "white", padding: 20 };

  useEffect(() => {
    onSnapshot(collection(firestore, DB_COLS.news), (snapshot) => {
      const result: Array<News> = snapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as News;
      });
      setNews(result);
    });
  }, []);

  const chips = ["All services", "Miami", "London", "Prague", "Miami"];

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={containerStyle}
          >
            <ScrollView>
              {chips.map((item) => (
                <Chip
                  mode="outlined"
                  onPress={() => console.log("Pressed")}
                  style={{ margin: 5 }}
                >
                  {item}
                </Chip>
              ))}
            </ScrollView>
          </Modal>
        </Portal>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {news.map(({ id, imgUrl, text, title, description }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate("NewsDetails", {
                    news: { id, imgUrl, text, title, description },
                  })
                }
                key={id}
              >
                <NewsPreview
                  key={id}
                  id={id}
                  imgUrl={imgUrl}
                  text={text}
                  title={title}
                  description={description}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Provider>
      <TouchableOpacity
        style={{
          top: 55,
          right: 10,
          position: "absolute",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 50,
          borderColor: "grey",
          borderWidth: 1,
        }}
        onPress={() => setVisible(!visible)}
      >
        <Icon name="filter" size={25} color={"grey"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
