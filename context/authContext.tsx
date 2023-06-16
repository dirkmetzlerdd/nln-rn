import React, { ReactNode, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { initialize } from "../firebase/main";
import { Profile } from "../types/user";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";
import { Service } from "../types/service";
import * as Location from "expo-location";

const { auth, firestore } = initialize();

export const AuthContext = createContext<{
  user: Partial<Profile> | null;
  news: Array<News>;
  services: Array<Service>;
  location: Location.LocationObject | null;
}>({
  user: null,
  news: [],
  services: [],
  location: null,
});

export const useAuthContext = () => React.useContext(AuthContext);
export const TasksDispatchContext = createContext(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<Partial<Profile> | null>(null);
  const [news, setNews] = React.useState<Array<News>>([]);
  const [services, setServices] = React.useState<Array<Service>>([]);
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser && authUser.email) {
        onSnapshot(doc(firestore, DB_COLS.profile, authUser.email), (doc) => {
          setUser(doc.data() as Profile);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      !user ||
      !user.subscribedToServices ||
      !Array.isArray(user.subscribedToServices)
    ) {
      setNews([]);
    } else {
      (async () => {
        const fetchedNews: Array<News> = [];
        const fetchedServices: Array<Service> = [];

        // @ts-ignore
        for (let i = 0; i < user.subscribedToServices.length; ++i) {
          // @ts-ignore
          const serviceId = user.subscribedToServices[i];

          const service = await getDoc(
            doc(firestore, DB_COLS.service, serviceId)
          );
          fetchedServices.push({
            id: service.id,
            ...service.data(),
          } as Service);

          const snapshot = await getDocs(
            collection(firestore, `service/${serviceId}/news`)
          );

          snapshot.forEach((doc) => {
            fetchedNews.push({ id: doc.id, serviceId, ...doc.data() } as News);
          });
        }

        setNews(fetchedNews);
        setServices(fetchedServices);
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, news, services, location }}>
      {children}
    </AuthContext.Provider>
  );
};
