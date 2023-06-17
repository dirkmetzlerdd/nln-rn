import { SafeAreaView, ScrollView, View } from "react-native";
import AddServiceStepOne from "../components/addServiceStepOne";
import { Button, RadioButton, Text } from "react-native-paper";
import { mainStyle } from "../style/main";
import { Reducer, useEffect, useReducer, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NewServiceState, Service } from "../types/service";
import { GeoPoint } from "firebase/firestore";
import { textInputReducer } from "../reducer/textInputReducer";
import { NewNews } from "../types/news";
import TextInputComponent from "../components/textInput";
import ImagePickerComp from "../components/imagePicker";
import { getMyServices } from "../firebase/service";
import { validateState } from "../utils/validateState";
import { addNewNews } from "../firebase/news";

const initialState: NewNews = {
  title: "",
  description: "",
  text: "",
  imgUrl: "",
  serviceId: "",
};

export default function AddNews() {
  const [services, setServices] = useState<Array<Service>>([]);
  const [state, dispatch] = useReducer<Reducer<NewNews, any>>(
    textInputReducer,
    initialState
  );

  const { colors } = useTheme();
  const [errorKeys, setErrorKeys] = useState<Array<string>>([]);

  const getDispatch = (key: string) => (v: string | number) =>
    dispatch({
      type: "update",
      payload: { key, value: v },
    });

  const removeKeyFromErrorKeys = (keyToRemove: string) =>
    setErrorKeys(errorKeys.filter((key) => key !== keyToRemove));

  const fields = [
    {
      id: "title",
      label: "Title",
      value: state.title,
      onChangeText: getDispatch("title"),
    },
    {
      id: "description",
      label: "Description",
      value: state.description,
      onChangeText: getDispatch("description"),
    },
    {
      id: "text",
      label: "Text",
      value: state.text,
      onChangeText: getDispatch("text"),
    },
  ];

  useEffect(() => {
    (async function () {
      const result = await getMyServices();
      setServices(result || []);
      if (result && result[0]) {
        getDispatch("serviceId")(result[0].id);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ justifyContent: "center" }}>
      <ScrollView style={{}}>
        <View style={{ padding: 10, paddingTop: 0 }}>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 20,
              fontWeight: "bold",
              alignSelf: "center",
              fontSize: mainStyle.fontXL,
            }}
          >
            News
          </Text>
          <ImagePickerComp setImgUrl={getDispatch("imgUrl")} imgFullSize />
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 4,
              borderWidth: 2,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: mainStyle.fontL,
                alignSelf: "center",
                margin: 10,
              }}
            >
              Current Service
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => getDispatch("serviceId")(newValue)}
              value={state.serviceId || ""}
            >
              {services.map((service) => (
                <RadioButton.Item
                  label={service.name}
                  value={service.id}
                  color={colors.primary}
                />
              ))}
            </RadioButton.Group>
          </View>
          {fields.map((item) => (
            <TextInputComponent
              key={item.id}
              id={item.id}
              label={item.label}
              value={item.value}
              onChangeText={item.onChangeText}
              multiline={false}
              error={errorKeys.includes(item.id)}
              removeKeyFromErrorKeys={removeKeyFromErrorKeys}
            />
          ))}
        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
          <Button
            mode="contained"
            style={{
              backgroundColor: colors.primary,
            }}
            // disabled={addressCheck !== true}
            onPress={() => {
              const errors = validateState(state).filter(
                (key) => key !== "imgUrl"
              );
              setErrorKeys(errors);
              if (errors.length === 0) {
                (async function () {
                  const id = await addNewNews(state);
                  // if (id) {
                  //   navigation.navigate("ServiceDetails", {
                  //     serviceId: id,
                  //   });
                  // }
                })();
              }
            }}
          >
            <Text
              style={{
                color: colors.background,
              }}
            >
              Save New Service
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
