import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  Modal,
  Portal,
  Text,
  Provider,
  Switch,
  Divider,
} from "react-native-paper";
import NewsPreview from "../components/newsPreview";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import { useAuthContext } from "../context/authContext";
import { mainStyle } from "../style/main";

export default function NewsList({ navigation }: any) {
  const [activeServices, setActiveServices] = useState<Array<string>>([]);
  const [visible, setVisible] = useState(false);
  const { news, services } = useAuthContext();
  const { colors } = useTheme();

  useEffect(() => {
    setActiveServices(services.map((item) => item.id));
  }, [services]);

  const toggleService = (id: string) => {
    if (activeServices.includes(id)) {
      setActiveServices(activeServices.filter((item) => item !== id));
    } else {
      setActiveServices([...activeServices, id]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              paddingVertical: 30,
              backgroundColor: colors.card,
              margin: mainStyle.mainScreenSpace * 2,
              borderRadius: mainStyle.rounded,
            }}
          >
            <ScrollView style={{}}>
              <View style={{ paddingHorizontal: 20 }}>
                <Divider />
                {services.map((item) => (
                  <View>
                    <Pressable
                      key={item.id}
                      onPress={() => toggleService(item.id)}
                      style={{
                        backgroundColor: colors.card,
                        marginVertical: 10,
                        paddingVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: mainStyle.fontXL,
                          alignSelf: "center",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Switch
                        color={colors.primary}
                        value={activeServices.includes(item.id)}
                        onValueChange={() => toggleService(item.id)}
                      />
                    </Pressable>
                    <Divider />
                  </View>
                ))}
              </View>
            </ScrollView>
          </Modal>
        </Portal>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {news
              .filter((item) => activeServices.includes(item.serviceId))
              .map(({ id, imgUrl, text, title, description }) => (
                <TouchableOpacity
                  key={id}
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate("NewsDetails", {
                      news: { id, imgUrl, text, title, description },
                    })
                  }
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
          right: 12,
          position: "absolute",
          backgroundColor: colors.card,
          padding: 15,
          borderRadius: 50,
          borderColor: colors.text,
          borderWidth: 1,
        }}
        onPress={() => setVisible(!visible)}
      >
        <Icon name="filter" size={30} color={colors.text} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
