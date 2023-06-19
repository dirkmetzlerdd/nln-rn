import { Reducer, useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NewServiceState } from "../types/service";
import { GeoPoint } from "firebase/firestore";
import { mainStyle } from "../style/main";
import TextInputComponent from "../components/textInput";
import { getGeoPointFromAddress } from "../utils/geopoint";
import { validateState } from "../utils/validateState";
import { addService } from "../firebase/service";
import ImagePickerComp from "./imagePicker";
import { textInputReducer } from "../reducer/textInputReducer";
import Map from "./map";

const initialState: NewServiceState = {
  name: "",
  description: "",
  city: "",
  zipCode: "",
  country: "",
  latitude: 0,
  longitude: 0,
};

export default function AddServiceStepOne() {
  const [state, dispatch] = useReducer<Reducer<NewServiceState, any>>(
    textInputReducer,
    initialState
  );

  const [errorKeys, setErrorKeys] = useState<Array<string>>([]);
  const [imgUrl, setImgUrl] = useState<string>("");
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [addressCheck, setAddressCheck] = useState<
    boolean | "pending" | "initial"
  >("initial");

  const getDispatch = (key: string) => (v: string | number) =>
    dispatch({
      type: "update",
      payload: { key, value: v },
    });

  const removeKeyFromErrorKeys = (keyToRemove: string) =>
    setErrorKeys(errorKeys.filter((key) => key !== keyToRemove));

  const fields = [
    {
      id: "name",
      label: "Name",
      value: state.name,
      onChangeText: getDispatch("name"),
    },
    {
      id: "description",
      label: "Description",
      value: state.description,
      onChangeText: getDispatch("description"),
      multiline: true,
    },
    {
      id: "city",
      label: "City",
      value: state.city,
      onChangeText: getDispatch("city"),
    },
    {
      id: "zipCode",
      label: "Zip Code",
      value: state.zipCode,
      onChangeText: getDispatch("zipCode"),
    },
    {
      id: "country",
      label: "Country",
      value: state.country,
      onChangeText: getDispatch("country"),
    },
  ];

  useEffect(() => {
    if (addressCheck === "pending") {
      (async function () {
        const res = await getGeoPointFromAddress(state);
        if (res.coords.latitude && res.coords.longitude) {
          getDispatch("latitude")(res.coords.latitude);
          getDispatch("longitude")(res.coords.longitude);
          setAddressCheck(true);
        } else {
          setAddressCheck(false);
        }
      })();
    }
  }, [addressCheck]);

  return (
    <View>
      <View style={{ padding: 10, paddingTop: 0 }}>
        <Text
          style={{
            fontSize: mainStyle.fontXL,
            marginTop: 10,
            fontWeight: "bold",
            flex: 1,
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          New service
        </Text>

        <ImagePickerComp setImgUrl={setImgUrl} />

        {fields.map((item) => (
          <TextInputComponent
            key={item.id}
            id={item.id}
            label={item.label}
            value={item.value}
            onChangeText={item.onChangeText}
            multiline={item.multiline}
            error={errorKeys.includes(item.id)}
            removeKeyFromErrorKeys={removeKeyFromErrorKeys}
          />
        ))}

        {addressCheck === false ? (
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              display: "flex",
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: mainStyle.fontL }}>
              Location Not found
            </Text>
          </View>
        ) : null}

        {![state.city, state.country, state.zipCode].includes("") ? (
          <Button
            mode="contained"
            onPress={() => setAddressCheck("pending")}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderColor: colors.primary,
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                color: colors.primary,
              }}
            >
              Show Service Location
            </Text>
          </Button>
        ) : null}
      </View>
      {addressCheck === true ? (
        <View style={{ marginBottom: 10 }}>
          <Map
            height={300}
            pointerEvents="auto"
            geopoint={new GeoPoint(state.latitude, state.longitude)}
          />
        </View>
      ) : null}

      <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
        <Button
          mode="contained"
          style={{
            backgroundColor: addressCheck ? colors.primary : "grey",
          }}
          disabled={addressCheck !== true}
          onPress={() => {
            const errors = validateState(state);
            setErrorKeys(errors);
            if (errors.length === 0) {
              (async function () {
                const id = await addService({ ...state, imgUrl });
                if (id) {
                  navigation.navigate("ServiceDetails", {
                    serviceId: id,
                  });
                }
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
    </View>
  );
}
