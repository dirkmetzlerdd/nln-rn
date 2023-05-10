import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { initialize } from "./main";
import { DB_COLS } from "../types/main";
import { NewProfile, Profile } from "../types/user";

const { firestore, auth } = initialize();

export function addProfile(newProfile: NewProfile) {
  setDoc(doc(collection(firestore, DB_COLS.profile), newProfile.email), {
    ...newProfile,
    createdAt: serverTimestamp(),
  });
}

export async function getProfile() {
  if (auth && auth.currentUser) {
    const profileRef = await getDocs(
      // USE EMAIL AS ID
      query(
        collection(firestore, DB_COLS.profile),
        where("authId", "==", auth.currentUser.uid)
      )
    );

    return {
      data: profileRef.docs.at(0)?.data(),
      id: profileRef.docs.at(0)?.id,
    };
  } else {
    return { data: undefined, id: undefined };
  }
}

export async function updateProfile({
  subscribedToServices,
}: Partial<Profile>) {
  if (auth && auth.currentUser) {
    const profileId = (await getProfile()).id;

    setDoc(
      doc(collection(firestore, DB_COLS.profile), profileId),
      { subscribedToServices },
      { merge: true }
    );
  }
}
