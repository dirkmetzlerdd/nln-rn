import { Timestamp } from "firebase/firestore";

export type Profile = {
  authId: string;
  email: string;
  firstName: string;
  surname: string;
  createdAt: Timestamp;
  isAdminOfServices: Array<string>;
  subscribedToServices: Array<string>;
  adminConfig: AdminConfig;
  appConfig: AppConfig;
};

export type NewProfile = Omit<
  Profile,
  | "createdAt"
  | "isAdminOfServices"
  | "subscribedToServices"
  | "appConfig"
  | "adminConfig"
  | "authId"
>;

type AdminConfig = {
  currentService: string;
};

type AppConfig = {};
