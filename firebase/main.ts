import { DB_COLS } from "../types/main";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";

export function initialize() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  return { firebaseApp, auth, firestore, storage };
}
