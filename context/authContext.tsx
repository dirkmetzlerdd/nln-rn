import React, { ReactNode, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { initialize } from "../firebase/main";
import { Profile } from "../types/user";
import { getProfile } from "../firebase/user";

const { auth } = initialize();

export const AuthContext = createContext<{
  user: Partial<Profile> | null;
}>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);
export const TasksDispatchContext = createContext(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<Partial<Profile> | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        (async () => {
          const profileData = (await getProfile()).data as Profile;
          setUser(profileData);
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
