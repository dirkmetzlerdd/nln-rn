export type Profile = {
  authId: string;
  email: string;
  firstName: string;
  surname: string;
  createdAt: number;
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
>;

type AdminConfig = {
  currentService: string;
};

type AppConfig = {};
