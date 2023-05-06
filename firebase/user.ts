import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { initialize } from "./main";
import { DB_COLS } from "../types/main";

const { firestore } = initialize();

// export function addProfile(newProfile: NewProfile) {
//   setDoc(doc(getCollection(DB_COLS.profile)), {
//     ...newProfile,
//     createdAt: Date.now(),
//   });
// }

export async function getProfile(authId: string) {
  const profileRef = await getDocs(
    query(collection(firestore, DB_COLS.profile), where("authId", "==", authId))
  );

  return profileRef.docs.at(0)?.data();
}
