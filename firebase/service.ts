import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  where,
  GeoPoint,
  query,
  getDocs,
} from "firebase/firestore";
import { initialize } from "./main";
import { NewService, Service } from "../types/service";
import { DB_COLS } from "../types/main";

const { auth, firestore } = initialize();

export async function addService(service: NewService) {
  if (!auth?.currentUser) return;

  const geopoint = new GeoPoint(
    Number(service.latitude),
    Number(service.longitude)
  );

  const docRef = doc(collection(firestore, DB_COLS.service));
  setDoc(docRef, {
    ...service,
    geopoint,
    createdAt: serverTimestamp(),
    ownerUid: auth.currentUser.email,
    adminUids: [auth.currentUser.email],
  });

  return docRef.id;
}

export async function getMyServices(): Promise<Array<Service> | undefined> {
  if (!auth?.currentUser?.email) return;

  const colRef = collection(firestore, DB_COLS.service);
  const querySnapshot = await getDocs(
    query(colRef, where("ownerUid", "==", auth.currentUser.email))
  );
  const services: Array<Service> = [];
  querySnapshot.forEach((doc) => {
    services.push({ ...doc.data(), id: doc.id } as Service);
  });

  return services;
}
