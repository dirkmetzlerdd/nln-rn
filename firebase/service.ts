import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  where,
  GeoPoint,
} from "firebase/firestore";
import { initialize } from "./main";
import { NewService } from "../types/service";
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
    ownerUid: auth.currentUser.uid,
    adminUids: [auth.currentUser.uid],
  });

  return docRef.id;
}
