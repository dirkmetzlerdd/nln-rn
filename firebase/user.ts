import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { initialize } from "./main";
import { DB_COLS } from "../types/main";
import { NewProfile, Profile } from "../types/user";

const { firestore, authEmail } = initialize();

export function addProfile(newProfile: NewProfile) {
  setDoc(doc(collection(firestore, DB_COLS.profile), newProfile.email), {
    ...newProfile,
    createdAt: serverTimestamp(),
  });
}

export async function getProfile() {
  let data = undefined;
  let id = undefined;

  if (authEmail) {
    const docRef = doc(collection(firestore, DB_COLS.profile), authEmail);
    const profileRef = await getDoc(docRef);
    data = profileRef.data();
    id = profileRef.id;
  }

  return { data, id };
}

export async function updateProfile({
  subscribedToServices,
}: Partial<Profile>) {
  if (authEmail) {
    setDoc(
      doc(collection(firestore, DB_COLS.profile), authEmail),
      { subscribedToServices },
      { merge: true }
    );
  }
}
