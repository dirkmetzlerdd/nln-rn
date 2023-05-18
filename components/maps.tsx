import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { GeoPoint } from "firebase/firestore";

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

interface MapInt {
  geopoint: GeoPoint;
  pointerEvents?: string;
  height?: number;
}
export default function Map({ geopoint, pointerEvents, height }: MapInt) {
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
      style={{ height: height || 200, width: "100%" }}
      pointerEvents={pointerEvents}
      initialRegion={{
        latitude: geopoint.latitude,
        longitude: geopoint.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        key={0}
        coordinate={{
          latitude: geopoint.latitude,
          longitude: geopoint.longitude,
        }}
        title={"Marker"}
        description={"Description"}
      />
    </MapView>
  );
}
