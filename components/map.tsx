import MapView, { Marker } from "react-native-maps";
import { GeoPoint } from "firebase/firestore";

type MapProps = {
  geopoint: GeoPoint;
  pointerEvents: "box-none" | "none" | "box-only" | "auto" | undefined;
  height?: number;
  showsUserLocation?: boolean;
};

export default function Map({
  geopoint,
  pointerEvents,
  height,
  showsUserLocation,
}: MapProps) {
  return (
    <MapView
      zoomEnabled={true}
      showsUserLocation={showsUserLocation}
      showsCompass
      style={{ height: height || 200, width: "100%" }}
      pointerEvents={pointerEvents}
      initialRegion={{
        latitude: geopoint.latitude,
        longitude: geopoint.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      onTouchEnd={() => console.log("TOUCH END")}
    >
      <Marker
        key={0}
        draggable
        coordinate={{
          latitude: geopoint.latitude,
          longitude: geopoint.longitude,
        }}
        title={"Marker"}
        description={"Description"}
        onDragEnd={(e) => console.log({ x: e.nativeEvent.coordinate })}
      />
    </MapView>
  );
}
