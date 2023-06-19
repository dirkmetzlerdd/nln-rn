import { GeoPoint } from "firebase/firestore";

export type Service = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  ownerUid: string;
  adminUids: Array<string>;
  latitude: number;
  longitude: number;
  city: string;
  zipCode: string;
  country: string;
  imgUrl: string;
  geopoint: GeoPoint;
};

export type NewService = Omit<
  Service,
  "createdAt" | "id" | "adminUids" | "ownerUid"
>;

export type NewServiceState = Omit<NewService, "imgUrl" | "geopoint">;
