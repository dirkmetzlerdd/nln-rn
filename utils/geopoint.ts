import { NewService } from "../types/service";

export async function getGeoPointFromAddress(address: Partial<NewService>) {
  let displayName = "";
  const coords = { latitude: 0, longitude: 0 };

  try {
    let url = `https://nominatim.openstreetmap.org/search?
    street=
    &city=${address.city}
    &country=${address.country}
    &postalcode=${address.zipCode}&format=json`;

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
    });

    const data: any = await response.json();
    displayName = data[0].display_name;
    coords.latitude = data[0].lat;
    coords.longitude = data[0].lon;
  } catch {
    return { displayName, coords };
  }

  return { displayName, coords };
}
