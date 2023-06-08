import MapView, { Marker } from "react-native-maps";
import { GeoPoint } from "firebase/firestore";

type MapProps = {
  geopoint: GeoPoint;
  pointerEvents: "box-none" | "none" | "box-only" | "auto" | undefined;
  height?: number;
};

export default function Map({ geopoint, pointerEvents, height }: MapProps) {
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
