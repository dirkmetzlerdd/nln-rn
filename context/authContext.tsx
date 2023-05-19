import React, { ReactNode, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { initialize } from "../firebase/main";
import { Profile } from "../types/user";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { DB_COLS } from "../types/main";
import { News } from "../types/news";

const { auth, firestore } = initialize();

export const AuthContext = createContext<{
  user: Partial<Profile> | null;
  news: Array<News>;
}>({
  user: null,
  news: [],
});

export const useAuthContext = () => React.useContext(AuthContext);
export const TasksDispatchContext = createContext(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<Partial<Profile> | null>(null);
  const [news, setNews] = React.useState<Array<News>>([]);

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

        // @ts-ignore
        for (let i = 0; i < user.subscribedToServices.length; ++i) {
          // @ts-ignore
          const serviceId = user.subscribedToServices[i];
          const snapshot = await getDocs(
            collection(firestore, `service/${serviceId}/news`)
          );

          snapshot.forEach((doc) => {
            fetchedNews.push({ id: doc.id, serviceId, ...doc.data() } as News);
          });
        }

        setNews(fetchedNews);
      })();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, news }}>
      {children}
    </AuthContext.Provider>
  );
};
