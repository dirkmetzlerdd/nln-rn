import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
} from "react-native";

// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Geolocation Permission",
//         message: "Can we access your location?",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK",
//       }
//     );
//     console.log("granted", granted);
//     if (granted === "granted") {
//       console.log("You can use Geolocation");
//       return true;
//     } else {
//       console.log("You cannot use Geolocation");
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };

export default function Map() {
  const state = { markers: [] };
  const [location, setLocation] = useState(false);

  useEffect(() => {
    // const getLocation = () => {
    //   const result = requestLocationPermission();
    //   result.then((res) => {
    //     console.log("res is:", res);
    //     if (res) {
    //       Geolocation.getCurrentPosition(
    //         (position) => {
    //           console.log(position);
    //           setLocation(position);
    //         },
    //         (error) => {
    //           // See error code charts below.
    //           console.log(error.code, error.message);
    //           setLocation(false);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //       );
    //     }
    //   });
    //   console.log(location);
    // };
  });
  return (
    <MapView
      style={{ height: "100%", width: "100%" }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        key={0}
        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        title={"Marker"}
        description={"Description"}
      />
    </MapView>
  );
}
