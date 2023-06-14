import { useEffect, useReducer, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { NewService } from "../types/service";
import { GeoPoint } from "firebase/firestore";
import { mainStyle } from "../style/main";
import TextInputComponent from "../components/textInput";
import { getGeoPointFromAddress } from "../utils/geopoint";
import Map from "./map";
import { useAuthContext } from "../context/authContext";

const initialState: NewService = {
  name: "",
  description: "",
  geopoint: new GeoPoint(Number(0), Number(0)),
  city: "",
  zipCode: "",
  country: "",
  latitude: 0,
  longitude: 0,
};

function reducer(
  state: NewService,
  action: { type: string; payload: { key: string; value: string | number } }
) {
  if (action.type === "update") {
    const { key, value } = action.payload;
    return {
      ...state,
      [key]: value,
    };
  }
  return state;
}

export default function AddServiceStepOne() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [addressCheck, setAddressCheck] = useState<
    boolean | "pending" | "initial"
  >("initial");
  const { colors } = useTheme();
  const { location } = useAuthContext();

  const getDispatch = (key: string) => (v: string | number) =>
    dispatch({
      type: "update",
      payload: { key, value: v },
    });

  const fields = [
    {
      label: "Name",
      value: state.name,
      onChangeText: getDispatch("name"),
    },
    {
      label: "Description",
      value: state.description,
      onChangeText: getDispatch("description"),
      multiline: true,
    },
    {
      label: "City",
      value: state.city,
      onChangeText: getDispatch("city"),
    },
    {
      label: "Zip Code",
      value: state.zipCode,
      onChangeText: getDispatch("zipCode"),
    },
    {
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
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View>
        <View style={{ padding: 10, paddingTop: 0 }}>
          <Text style={{ fontSize: mainStyle.fontXL, marginTop: 10 }}>
            Add New service
          </Text>
          {fields.map((item) => (
            <TextInputComponent
              key={item.label}
              label={item.label}
              value={item.value}
              onChangeText={item.onChangeText}
              multiline={item.multiline}
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
                marginBottom: 10,
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
              pointerEvents="auto"
              height={300}
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
            disabled={addressCheck === true}
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
    </SafeAreaView>
  );
}
