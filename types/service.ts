import { GeoPoint } from "firebase/firestore";

export type Service = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  ownerUid: string;
  adminUids: Array<string>;
  geopoint: GeoPoint;
};

export type NewService = Omit<
  Service,
  "createdAt" | "id" | "adminUids" | "ownerUid"
>;
