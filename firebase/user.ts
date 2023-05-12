import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { initialize } from "./main";
import { DB_COLS } from "../types/main";
import { NewProfile } from "../types/user";

const { firestore, auth } = initialize();

export function addProfile(newProfile: NewProfile) {
  setDoc(doc(collection(firestore, DB_COLS.profile), newProfile.email), {
    ...newProfile,
    createdAt: serverTimestamp(),
  });
}

export async function getProfile() {
  let data = undefined;
  let id = undefined;

  if (auth?.currentUser?.email) {
    const docRef = doc(
      collection(firestore, DB_COLS.profile),
      auth.currentUser.email
    );
    const profileRef = await getDoc(docRef);
    data = profileRef.data();
    id = profileRef.id;
  }

  return { data, id };
}

export async function toggleServiceSubscription(serviceId: string | undefined) {
  if (auth?.currentUser?.email) {
    const { data } = await getProfile();
    let subscribedToServices = data?.subscribedToServices || [];

    if (subscribedToServices.includes(serviceId)) {
      subscribedToServices = subscribedToServices.filter(
        (item: string) => item !== serviceId
      );
    } else {
      subscribedToServices.push(serviceId);
    }

    setDoc(
      doc(collection(firestore, DB_COLS.profile), auth.currentUser.email),
      { subscribedToServices },
      { merge: true }
    );
  }
}
