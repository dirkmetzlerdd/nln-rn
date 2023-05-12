import React, { ReactNode, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { initialize } from "../firebase/main";
import { Profile } from "../types/user";
import { getProfile } from "../firebase/user";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { DB_COLS } from "../types/main";
import { Service } from "../types/service";

const { auth, firestore } = initialize();

export const AuthContext = createContext<{
  user: Partial<Profile> | null;
}>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);
export const TasksDispatchContext = createContext(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<Partial<Profile> | null>(null);
  const [myServices, setMyServices] = React.useState<Partial<Service> | []>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        (async () => {
          onSnapshot(doc(firestore, DB_COLS.profile, user.email), (doc) => {
            setUser(doc.data() as Profile);
          });
        })();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
