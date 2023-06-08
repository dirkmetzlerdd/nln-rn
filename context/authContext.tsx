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
const geofire = require("geofire-common");

const { auth, firestore } = initialize();

export const AuthContext = createContext<{
  user: Partial<Profile> | null;
  news: Array<News>;
  services: Array<Service>;
}>({
  user: null,
  news: [],
  services: [],
});

export const useAuthContext = () => React.useContext(AuthContext);
export const TasksDispatchContext = createContext(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<Partial<Profile> | null>(null);
  const [news, setNews] = React.useState<Array<News>>([]);
  const [services, setServices] = React.useState<Array<Service>>([]);

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

      let location = await Location.getCurrentPositionAsync({});
      console.log("location");
      console.log(location);
      const center = [51.5074, 0.1278];
      const radiusInM = 50 * 1000;

      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      console.log("bounds");
      console.log(bounds);
    })();
  });

  return (
    <AuthContext.Provider value={{ user, news, services }}>
      {children}
    </AuthContext.Provider>
  );
};
